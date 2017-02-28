package com.RenGu.util;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by wey580231 on 2017/2/28.
 */
public class CommonUtil {

    public static String KEY = "nanjingrengu";

    //获取封装的结果信息，正确信息返回200，错误信息返回400
    public static String getWrappMessge(String status, String message) {
        Map<String, String> res_map = new HashMap<String, String>();
        res_map.put("code", status);
        res_map.put("message", message);
        String send_sign = "";
        try {
            send_sign = DesUtil.encryptBasedDes(DesUtil.getSignStr(res_map), KEY);//根据返回的参数生成的sign
        } catch (Exception e) {
            e.printStackTrace();
        }
        res_map.put("SIGN", send_sign);

        String errorMessag = new JSONObject(res_map).toString();
        System.out.println(errorMessag);
        return errorMessag;
    }

    //获取正确结果信息
    public static String getRightMessage(String status, String ip, String name, String pass) {
        Map<String, String> map = new HashMap<String, String>();

        map.put("code", status);
        map.put("message", "");
        map.put("ip", ip);
        map.put("name", name);
        map.put("password", pass);

        String send_sign = "";
        try {
            send_sign = DesUtil.encryptBasedDes(DesUtil.getSignStr(map), KEY);//根据返回的参数生成的sign
        } catch (Exception e) {
            e.printStackTrace();
        }

        String finalResult = new JSONObject(map).toString();
        System.out.println(finalResult);
        return finalResult;
    }

    //将数组转换成字符串
    public static String arryToString(String[] array, String splitFlag) {
        StringBuffer buff = new StringBuffer();
        for (int i = 0; i < array.length; i++) {
            if (i < array.length - 1) {
                buff.append(array[i]).append(splitFlag);
            } else {
                buff.append(array[i]);
            }
        }
        return buff.toString();
    }
}
