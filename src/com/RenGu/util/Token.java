package com.RenGu.util;

/**
 * Created by hanch on 2017/2/9.
 */
public class Token {
    private static String token;
    private static String expires;
    private static String projectID;

    public static String getToken() {
        return token;
    }

    public static void setToken(String token) {
        Token.token = token;
    }

    public static String getExpires() {
        return expires;
    }

    public static void setExpires(String expires) {
        Token.expires = expires;
    }

    public static String getProjectID() {
        return projectID;
    }

    public static void setProjectID(String projectID) {
        Token.projectID = projectID;
    }

    public static String printAll(){
        String result = "";
        result = "token:" + token + "\n" + "expires:" + expires +"\n" + "projectID:" + projectID + "\n";
//        System.out.println(result);
        return  result;
    }
}
