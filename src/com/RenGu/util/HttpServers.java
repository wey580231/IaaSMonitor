package com.RenGu.util;

import okhttp3.*;

import java.io.IOException;

public class HttpServers {
    public static String doLogin(String userName, String passWord, String url) {
        String loginJsonString = "";
        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\r\n \"auth\": {\r\n        \"tenantName\": \"admin\",\r\n        \"passwordCredentials\": {\r\n            \"username\": \"" + userName + "\",\r\n            \"password\": \"" + passWord + "\"\r\n        }\r\n    }\r\n}");
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("content-type", "application/json")
                .build();
        try {
            Response response = client.newCall(request).execute();
            loginJsonString = response.body().string();
            JSONParse.loginJsonParse(loginJsonString);
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
            jsonString = response.body().string();
            return jsonString;
        } catch (IOException e) {
            e.printStackTrace();
            return jsonString;
        }
    }
}
