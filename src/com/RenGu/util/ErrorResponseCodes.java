package com.RenGu.util;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by hanch on 2017/2/9.
 */
public class ErrorResponseCodes {
    public static Map<String , String> errorResponseCodes = new HashMap<>();
    static {
        errorResponseCodes.put("400" , "badRequest");
        errorResponseCodes.put("401" , "unauthorized");
        errorResponseCodes.put("403" , "forbidden");
        errorResponseCodes.put("404" , "itemNotFound");
        errorResponseCodes.put("409" , "conflict");
        errorResponseCodes.put("413" , "entityTooLarge");
    }
}
