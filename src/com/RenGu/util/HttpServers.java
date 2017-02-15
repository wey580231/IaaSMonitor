package com.RenGu.util;

import okhttp3.*;

import java.io.IOException;

public class HttpServers {
    public static String doLogin(String userName, String passWord, String tenantName, String url) {
        String loginJsonString = "";
        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\r\n \"auth\": {\r\n        \"tenantName\": \"" + tenantName + "\",\r\n        \"passwordCredentials\": {\r\n            \"username\": \"" + userName + "\",\r\n            \"password\": \"" + passWord + "\"\r\n        }\r\n    }\r\n}");
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("content-type", "application/json")
                .build();
        try {
            Response response = client.newCall(request).execute();
            //后台显示HTTP请求结果状态
            System.out.println("请求地址：" + response.request().url() + "--->请求状态：" + response.message());
            loginJsonString = response.body().string();
            return loginJsonString;
        } catch (IOException e) {
            e.printStackTrace();
            return loginJsonString;
        }
    }

    public static String doGet(String url, String token) {
        String jsonString = "";
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .get()
                .addHeader("x-auth-token", token)
                .build();
        try {
            Response response = client.newCall(request).execute();
            //后台显示HTTP请求结果状态
            System.out.println("请求地址：" + response.request().url() + "--->请求状态：" + response.message());
            jsonString = response.body().string();
            return jsonString;
        } catch (IOException e) {
            e.printStackTrace();
            return jsonString;
        }
    }

    public static String doPost(String url, String token, String requestJsonString) {
        String jsonString = "";
        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, requestJsonString);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("x-auth-token", token)
                .addHeader("content-type", "application/json")
                .build();
        try {
            Response response = client.newCall(request).execute();
            //后台显示HTTP请求结果状态
            System.out.println("请求地址：" + response.request().url() + "--->请求状态：" + response.message());
            jsonString = response.body().string();
            return jsonString;
        } catch (IOException e) {
            e.printStackTrace();
            return jsonString;
        }
    }

    public static String doDelete(String url, String token) {
        OkHttpClient client = new OkHttpClient();
        String jsonString = "";
        Request request = new Request.Builder()
                .url(url)
                .delete(null)
                .addHeader("x-auth-token", token)
                .build();

        try {
            Response response = client.newCall(request).execute();
            //后台显示HTTP请求结果状态
            System.out.println("请求地址：" + response.request().url() + "--->请求状态：" + response.message());
            jsonString = response.body().string();
            return jsonString;
        } catch (IOException e) {
            e.printStackTrace();
            return jsonString;
        }
    }
}
