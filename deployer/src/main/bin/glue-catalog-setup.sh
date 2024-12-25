#!/bin/sh
## 如果遇到格式问题执行 sed -i -e 's/\r$//' glue-catalog-setup.sh
run_env=$1
echo "开始执行脚本 运行环境 $1"
if [ "$run_env" = "prod" ]; then
    S3_BUCKET=s3-bucket
else
    S3_BUCKET=s3-bucket
fi
PEM_KEY=/tmp/datalake.pem
sudo cp /usr/share/aws/hmclient/lib/aws-glue-datacatalog-hive3-client.jar /lib/flink/lib/
sudo cp /usr/lib/hive/lib/antlr-runtime-3.5.2.jar /lib/flink/lib/
sudo cp /usr/lib/hive/lib/hive-exec-3.1.3*.jar /lib/flink/lib/
sudo cp /usr/lib/hive/lib/libfb303-0.9.3.jar /lib/flink/lib/

FLINK_VERSION=$(/usr/lib/flink/bin/flink --version | grep "Version:" | awk '{print $2}')
echo "当前flink版本 $FLINK_VERSION"
# 判断flink版本是否为1.18
result=$(echo $FLINK_VERSION | grep "1.18")
if [[ "$result" != "" ]]
then
    sudo cp /usr/lib/flink/opt/flink-connector-hive_2.12-1.18.0-amzn-0.jar /lib/flink/lib/
    # 添加默认的连接器
    sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/lib/1.18/flink-connector-kafka-3.2.0-1.18.jar /lib/flink/lib  --region=cn-north-1
    sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/lib/1.18/flink-connector-kinesis-4.3.0-1.18.jar /lib/flink/lib  --region=cn-north-1
    sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/lib/1.18/flink-connector-starrocks-1.2.9_flink-1.18.jar	 /lib/flink/lib  --region=cn-north-1
    sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/lib/1.18/hudi-flink1.18-bundle-0.15.0.jar /lib/flink/lib  --region=cn-north-1
    sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/lib/1.18/mysql-connector-java-8.0.27.jar /lib/flink/lib  --region=cn-north-1

else
    sudo cp /usr/lib/flink/opt/flink-connector-hive_2.12-1.16.0.jar /lib/flink/lib/
    # 添加默认的连接器
    sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/lib/flink-connector-kafka-1.16.0.jar /lib/flink/lib  --region=cn-north-1
    sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/lib/hudi-flink1.16-bundle-0.13.1.jar /lib/flink/lib  --region=cn-north-1
    sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/lib/datanucleus-core-5.2.10.jar /lib/flink/lib  --region=cn-north-1
    sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/lib/flink-connector-kinesis-1.16.0.jar /lib/flink/lib  --region=cn-north-1
    sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/lib/jackson-dataformat-cbor-2.12.0.jar /lib/flink/lib  --region=cn-north-1
    sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/lib/flink-connector-dynamodb-4.2-SNAPSHOT.jar /lib/flink/lib  --region=cn-north-1
    sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/lib/flink-connector-starrocks-1.2.9_flink-1.16.jar /lib/flink/lib  --region=cn-north-1

fi
sudo chmod 755 /lib/flink/lib/*.jar
sudo mkdir -p /app/flink-web
sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/setup/flink-streaming-platform-web.tar.gz /var  --region=cn-north-1
sudo tar -zxvf /var/flink-streaming-platform-web.tar.gz -C /app/flink-web
sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/setup/application.properties /app/flink-web/flink-streaming-platform-web/conf --region=cn-north-1

# 将pem复制到主节点
sudo aws s3 cp s3://$S3_BUCKET/flink_hudi_setup/setup/datalake.pem /tmp --region=cn-north-1
sudo chmod 600 $PEM_KEY
# 设置中国时区
sudo ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
CLUSTER_ID=$(sudo jq -r '.jobFlowId' /mnt/var/lib/info/job-flow.json)
PRIVATE_DNS=$(sudo aws emr describe-cluster --cluster-id $CLUSTER_ID --query 'Cluster.MasterPublicDnsName' --output text --region=cn-north-1)

# 将 hive-site.xml 从主节点复制到其他节点
for INSTANCE_ID in $(sudo aws emr list-instances --cluster-id $CLUSTER_ID --instance-group-types "CORE" --query 'Instances[*].Ec2InstanceId' --output text --region=cn-north-1)
do
  INSTANCE_PRIVATE_IP=$(sudo aws ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[*].Instances[*].PrivateIpAddress' --output text --region=cn-north-1)
  sudo scp -o StrictHostKeyChecking=no -i $PEM_KEY  /etc/hive/conf/hive-site.xml hadoop@$INSTANCE_PRIVATE_IP:/home/hadoop
  sudo ssh -i $PEM_KEY hadoop@$INSTANCE_PRIVATE_IP << EOF
       sudo mkdir -p /etc/hive/conf
       sudo mv /home/hadoop/hive-site.xml /etc/hive/conf
EOF
done
cd /app/flink-web/flink-streaming-platform-web/bin

# 启动web
sudo sh deploy.sh  client start
echo "端口: 9084, 登录号：admin  默认密码 123456"
echo "任务执行成功"
