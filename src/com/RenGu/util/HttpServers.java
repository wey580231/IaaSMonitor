//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.RenGu.util;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.Request.Builder;

public class HttpServers {
    public HttpServers() {
    }

    public static String doLogin(String userName, String passWord, String tenantName, String url) {
        String loginJsonString = "";
        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\r\n \"auth\": {\r\n        \"tenantName\": \"" + tenantName + "\",\r\n        \"passwordCredentials\": {\r\n            \"username\": \"" + userName + "\",\r\n            \"password\": \"" + passWord + "\"\r\n        }\r\n    }\r\n}");
        Request request = (new Builder()).url(url).post(body).addHeader("content-type", "application/json").build();

        try {
            Response e = client.newCall(request).execute();
            System.out.println("Post请求地址：" + e.request().url() + "--->请求状态：" + e.message());
            loginJsonString = e.body().string();
            return loginJsonString;
        } catch (IOException var10) {
            var10.printStackTrace();
            return loginJsonString;
        }
    }

    public static String doGet(String url, String token) {
        String jsonString = "";
        OkHttpClient client = new OkHttpClient();
        Request request = (new Builder()).url(url).get().addHeader("x-auth-token", token).build();

        try {
            Response e = client.newCall(request).execute();
            System.out.println("Get请求地址：" + e.request().url() + "--->请求状态：" + e.message());
            jsonString = e.body().string();
            return jsonString;
        } catch (IOException var6) {
            var6.printStackTrace();
            return jsonString;
        }
    }

    public static String doPost(String url, String token, String requestJsonString) {
        String jsonString = "";
        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, requestJsonString);
        Request request = (new Builder()).url(url).post(body).addHeader("x-auth-token", token).addHeader("content-type", "application/json").build();

        try {
            Response e = client.newCall(request).execute();
            System.out.println("Post请求地址：" + e.request().url() + "--->请求状态：" + e.message());
            jsonString = e.body().string();
            return jsonString;
        } catch (IOException var9) {
            var9.printStackTrace();
            return jsonString;
        }
    }

    public static void doDelete(String url, String token) {
        OkHttpClient client = new OkHttpClient();
        Request request = (new Builder()).url(url).delete((RequestBody) null).addHeader("x-auth-token", token).build();
        try {
            Response e = client.newCall(request).execute();
            System.out.println("Delete请求地址：" + e.request().url() + "--->请求状态：" + e.message());
        } catch (IOException var6) {
            var6.printStackTrace();
        }
    }

    public static String doCreatStacks(String template, String stackName, String token, String url) {
        String jsonString = "";
        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\n  \"files\": {},\n  \"disable_rollback\": true,\n  \"stack_name\": \"" + stackName + "\",\n  \"template\": " + template + ",\n  \"timeout_mins\": 60\n}");
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("x-auth-token", token)
                .addHeader("content-type", "application/json")
                .build();
        try {
            Response e = client.newCall(request).execute();
            System.out.println("Post请求地址：" + e.request().url() + "--->请求状态：" + e.message());
            jsonString = e.body().string();
            return jsonString;
        } catch (IOException var10) {
            var10.printStackTrace();
            return jsonString;
        }
    }

    public static void doPut(String url, String token) {
        String jsonString = "";
        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "");
        Request request = new Request.Builder()
                .url(url)
                .put(body)
                .addHeader("x-auth-token", token)
                .addHeader("content-type", "application/json")
                .build();

        try {
            Response response = client.newCall(request).execute();
            System.out.println("Put请求地址：" + response.request().url() + "--->请求状态：" + response.message());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //发回创建虚拟机的信息，增加请求超时
    public static String sendBackStackInfo(String url, String data) {
        String jsonString = "";
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, data);

        OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(10, TimeUnit.SECONDS)
                .writeTimeout(10, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .build();

        Request request = (new Builder()).url(url).post(body).addHeader("content-type", "application/json").build();

        try {
            Response e = client.newCall(request).execute();
            System.out.println("sendBackStackInfo ：" + e.request().url() + "--->请求状态：" + e.message());
            jsonString = e.body().string();
            return jsonString;
        } catch (IOException var9) {
            var9.printStackTrace();
            return jsonString;
        }
    }
}