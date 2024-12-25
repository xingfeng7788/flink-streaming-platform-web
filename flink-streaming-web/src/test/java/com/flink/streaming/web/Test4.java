package com.flink.streaming.web;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Objects;

public class Test4 {
/**
 * @author dingtianlu
 * @date 2023-10-17 13:22
 */
private static final long MIDDLE_BIT = 2L;

    public static void main(String[] args) throws UnknownHostException {
        long machineHash = Math.abs(Objects.hash(InetAddress.getLocalHost().getHostName())) % (2 << (MIDDLE_BIT - 1));
        System.out.println("ttt");
    }
}
