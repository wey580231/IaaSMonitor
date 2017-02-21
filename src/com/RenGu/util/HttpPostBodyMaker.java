package com.RenGu.util;

public class HttpPostBodyMaker {
    public static String createUser(String defaultProjectID, String name, String password) {
        String jsonBody = "{\"user\":{\"default_project_id\":\"" + defaultProjectID + "\",\"enabled\":true,\"name\":\"" + name + "\",\"password\":\"" + password + "\"}}";
        return jsonBody;
    }

    public static String createProject(String description, String name) {
        String jsonBody = "{\"project\":{\"description\":\"" + description + "\",\"name\":\"" + name + "\"}}";
        return jsonBody;
    }
}