(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1910e28a"],{adc5:function(t,e,a){"use strict";a("b583")},b1ad:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"tab-container",attrs:{size:"mini"}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"180px"}},[a("el-form-item",{attrs:{inline:"true"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v("Flink客户端目录 "),a("el-popover",{attrs:{placement:"right",trigger:"hover"}},[a("p",[t._v("Flink客户端目录（必选）")]),a("i",{staticClass:"el-icon-info",attrs:{slot:"reference"},slot:"reference"})])],1),a("el-input",{staticClass:"fl-form-item",attrs:{placeholder:"Flink客户端目录（必选）"},model:{value:t.form.flink_home,callback:function(e){t.$set(t.form,"flink_home",e)},expression:"form.flink_home"}}),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateConfig("flink_home",t.form.flink_home)}}},[t._v("提交")]),a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.deleteConfig("flink_home")}}},[t._v("删除")])],1),a("el-form-item",{attrs:{inline:"true"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v("Flink管理平台目录 "),a("el-popover",{attrs:{placement:"right",trigger:"hover"}},[a("p",[t._v("Flink管理平台应用安装的目录（必选）")]),a("i",{staticClass:"el-icon-info",attrs:{slot:"reference"},slot:"reference"})])],1),a("el-input",{staticClass:"fl-form-item",attrs:{placeholder:"Flink管理平台应用安装的目录（必选）"},model:{value:t.form.flink_streaming_platform_web_home,callback:function(e){t.$set(t.form,"flink_streaming_platform_web_home",e)},expression:"form.flink_streaming_platform_web_home"}}),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateConfig("flink_streaming_platform_web_home",t.form.flink_streaming_platform_web_home)}}},[t._v("提交")]),a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.deleteConfig("flink_streaming_platform_web_home")}}},[t._v("删除")])],1),a("el-form-item",{attrs:{inline:"true"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v("自动开启savepoint "),a("el-popover",{attrs:{placement:"right",trigger:"hover"}},[a("p",[t._v("全局配置 默认开启 变量值 true 或 false")]),a("i",{staticClass:"el-icon-info",attrs:{slot:"reference"},slot:"reference"})])],1),a("el-input",{staticClass:"fl-form-item",attrs:{placeholder:"全局配置 默认开启 变量值 true 或 false"},model:{value:t.form.auto_savepoint,callback:function(e){t.$set(t.form,"auto_savepoint",e)},expression:"form.auto_savepoint"}}),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateConfig("auto_savepoint",t.form.auto_savepoint)}}},[t._v("提交")]),a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.deleteConfig("auto_savepoint")}}},[t._v("删除")])],1),a("el-form-item",{attrs:{inline:"true"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v("savepoint默认S3路径 "),a("el-popover",{attrs:{placement:"right",trigger:"hover"}},[a("p",[t._v("savepoint默认S3路径 PS:S3路径")]),a("i",{staticClass:"el-icon-info",attrs:{slot:"reference"},slot:"reference"})])],1),a("el-input",{staticClass:"fl-form-item",attrs:{placeholder:"savepoint默认S3路径"},model:{value:t.form.default_savepoint_root_path,callback:function(e){t.$set(t.form,"default_savepoint_root_path",e)},expression:"form.default_savepoint_root_path"}}),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateConfig("default_savepoint_root_path",t.form.default_savepoint_root_path)}}},[t._v("提交")]),a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.deleteConfig("default_savepoint_root_path")}}},[t._v("删除")])],1),a("el-form-item",{attrs:{inline:"true"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v("上传Jar包默认S3路径 "),a("el-popover",{attrs:{placement:"right",trigger:"hover"}},[a("p",[t._v("上传Jar包默认S3路径 PS:s3://s3-001-shinho-datalake-uat-bjs/flink-web/uploads/")]),a("i",{staticClass:"el-icon-info",attrs:{slot:"reference"},slot:"reference"})])],1),a("el-input",{staticClass:"fl-form-item",attrs:{placeholder:"上传Jar包默认S3路径"},model:{value:t.form.default_upload_jar_path,callback:function(e){t.$set(t.form,"default_upload_jar_path",e)},expression:"form.default_upload_jar_path"}}),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateConfig("default_upload_jar_path",t.form.default_upload_jar_path)}}},[t._v("提交")]),a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.deleteConfig("default_upload_jar_path")}}},[t._v("删除")])],1)],1)],1)},n=[],r=(a("d3b7"),a("159b"),a("da71")),i={name:"SystemCfg",data:function(){return{loading:!1,form:{flink_home:"",flink_streaming_platform_web_home:"",auto_savepoint:"",default_savepoint_root_path:"",default_upload_jar_path:""}}},mounted:function(){this.queryConfig()},methods:{queryConfig:function(){var t=this;this.loading=!0,Object(r["c"])().then((function(e){t.loading=!1;var a=e.code,o=e.success,n=e.message,r=e.data;"200"===a&&o?(t.form.flink_home="",t.form.flink_streaming_platform_web_home="",t.form.auto_savepoint="",t.form.default_savepoint_root_path="",t.form.default_upload_jar_path="",r.forEach((function(e){"flink_home"===e.key?t.form.flink_home=e.val:"flink_streaming_platform_web_home"===e.key?t.form.flink_streaming_platform_web_home=e.val:"auto_savepoint"===e.key?t.form.auto_savepoint=e.val:"default_savepoint_root_path"===e.key?t.form.default_savepoint_root_path=e.val:"default_upload_jar_path"===e.key&&(t.form.default_upload_jar_path=e.val)}))):t.$message({type:"error",message:n||"请求数据异常！"})})).catch((function(e){t.loading=!1,t.$message({type:"error",message:"请求异常！"}),console.log(e)}))},updateConfig:function(t,e){var a=this;this.loading=!0,Object(r["e"])(t,e).then((function(t){a.loading=!1;var e=t.code,o=t.success,n=t.message;t.data;"200"===e&&o?(a.$message({type:"success",message:"更新成功！"}),a.queryConfig()):a.$message({type:"error",message:n||"请求数据异常！"})})).catch((function(t){a.loading=!1,a.$message({type:"error",message:"请求异常！"}),console.log(t)}))},deleteConfig:function(t){var e=this,a="";"flink_home"===t?a="Flink主目录地址配置":"flink_streaming_platform_web_home"===t?a="Flink管理平台Web地址配置":"yarn_rm_http_address"===t?a="Yarn RM Http地址配置":"flink_rest_http_address"===t?a="Flink Web地址":"flink_rest_ha_http_address"===t?a="Flink HA Web地址":"auto_savepoint"===t?a="Flink auto_savepoint":"default_savepoint_root_path"===t?a="savepoint默认S3路径":"default_upload_jar_path"===t&&(a="上传Jar包默认S3路径"),this.$confirm("是否删除".concat(a),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.loading=!0,Object(r["b"])(t).then((function(t){e.loading=!1;var a=t.code,o=t.success,n=t.message;t.data;"200"===a&&o?(e.$message({type:"success",message:"删除成功！"}),e.queryConfig()):e.$message({type:"error",message:n||"请求数据异常！"})})).catch((function(t){e.loading=!1,e.$message({type:"error",message:"请求异常！"}),console.log(t)}))}))}}},l=i,s=(a("adc5"),a("2877")),f=Object(s["a"])(l,o,n,!1,null,"44f71516",null);e["default"]=f.exports},b583:function(t,e,a){},da71:function(t,e,a){"use strict";a.d(e,"a",(function(){return i})),a.d(e,"c",(function(){return l})),a.d(e,"e",(function(){return s})),a.d(e,"d",(function(){return f})),a.d(e,"b",(function(){return u}));var o=a("b775"),n=a("4328"),r=a.n(n);function i(){return Object(o["a"])({url:"/alartConfig",method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:[function(t){return r.a.stringify(t)}],data:{}})}function l(){return Object(o["a"])({url:"/sysConfig",method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:[function(t){return r.a.stringify(t)}],data:{}})}function s(t,e){return Object(o["a"])({url:"/upsertSynConfig",method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:[function(t){return r.a.stringify(t)}],data:{key:t,val:e}})}function f(t){return Object(o["a"])({url:t,method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function u(t){return Object(o["a"])({url:"/deleteConfig",method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:[function(t){return r.a.stringify(t)}],data:{key:t}})}}}]);