package com.RenGu.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by hanch on 2017/2/9.
 */
public class OpenStackInfo {
    private static Map<String, String> openStackEndpointUrl = new HashMap<>();

    public static Map<String, String> getOpenStackEndpointUrl() {
        return openStackEndpointUrl;
    }

    public static String printAll() {
        String resual = "";
        Set<String> set = openStackEndpointUrl.keySet();
        for (String keyString : set) {
            resual = resual + "\n" + keyString + ":" + openStackEndpointUrl.get(keyString) + "\n";
//            System.out.println(keyString + ":" + openStackEndpointUrl.get(keyString));
        }
        return  resual;
    }
}
