//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.RenGu.util;

import java.io.IOException;
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
            System.out.println("请求地址：" + e.request().url() + "--->请求状态：" + e.message());
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
            System.out.println("请求地址：" + e.request().url() + "--->请求状态：" + e.message());
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
            System.out.println("请求地址：" + e.request().url() + "--->请求状态：" + e.message());
            jsonString = e.body().string();
            return jsonString;
        } catch (IOException var9) {
            var9.printStackTrace();
            return jsonString;
        }
    }

    public static String doDelete(String url, String token) {
        OkHttpClient client = new OkHttpClient();
        String jsonString = "";
        Request request = (new Builder()).url(url).delete((RequestBody)null).addHeader("x-auth-token", token).build();

        try {
            Response e = client.newCall(request).execute();
            System.out.println("请求地址：" + e.request().url() + "--->请求状态：" + e.message());
            jsonString = e.body().string();
            return jsonString;
        } catch (IOException var6) {
            var6.printStackTrace();
            return jsonString;
        }
    }

    public static String doCreatStacks(String template, String stackName, String token, String url) {
        String jsonString = "";
        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json");
<<<<<<< HEAD
        RequestBody body = RequestBody.create(mediaType, "{\n  \"files\": {},\n  \"disable_rollback\": true,\n  \"stack_name\": \"" + stackName + "\",\n  \"template\": " + template + ",\n  \"timeout_mins\": 60\n}");
        Request request = (new Builder()).url(url).post(body).addHeader("x-auth-token", token).addHeader("content-type", "application/json").build();

=======
        RequestBody body = RequestBody.create(mediaType, "{\n  \"files\": {},\n  \"disable_rollback\": true,\n  \"stack_name\": \""+stackName+"\",\n  \"template\": "+template+",\n  \"timeout_mins\": 60\n}");
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("x-auth-token", token)
                .addHeader("content-type", "application/json")
                .build();
        System.out.println(body.toString());
>>>>>>> 4eab57cf6194e868bac5176a017c4b1c884fb84b
        try {
            Response e = client.newCall(request).execute();
            System.out.println("请求地址：" + e.request().url() + "--->请求状态：" + e.message());
            jsonString = e.body().string();
            return jsonString;
        } catch (IOException var10) {
            var10.printStackTrace();
            return jsonString;
        }
    }
}