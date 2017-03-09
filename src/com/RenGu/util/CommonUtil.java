package com.RenGu.util;

import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by wey580231 on 2017/2/28.
 */
public class CommonUtil {

    public static String KEY = "20170228";

    //获取封装的结果信息，正确信息返回200，错误信息返回400
    public static String getWrappMessge(String status, String message, String id) {
        Map<String, String> res_map = new HashMap<String, String>();
        res_map.put("code", status);
        res_map.put("message", message);
        res_map.put("id", id);
        String send_sign = "";
        try {
            send_sign = DesUtil.encryptBasedDes(DesUtil.getSignStr(res_map), KEY);//根据返回的参数生成的sign
        } catch (Exception e) {
            e.printStackTrace();
        }
        res_map.put("sign", send_sign);

        String errorMessag = new JSONObject(res_map).toString();
        return errorMessag;
    }

    //获取正确结果信息
    public static String getRightMessage(String status, String ip, String name, String pass, String id) {
        Map<String, String> map = new HashMap<String, String>();

        map.put("code", status);
        map.put("message", "");
        map.put("ip", ip);
        map.put("name", name);
        map.put("password", pass);
        map.put("id", id);

        String send_sign = "";
        try {
            send_sign = DesUtil.encryptBasedDes(DesUtil.getSignStr(map), KEY);//根据返回的参数生成的sign
        } catch (Exception e) {
            e.printStackTrace();
        }

        map.put("sign", send_sign);

        String finalResult = new JSONObject(map).toString();
        return finalResult;
    }

    public static Map<String, String> requestToMap(HttpServletRequest request) {
        Map<String, String> requestMap = new HashMap<String, String>();
        try {
            InputStream inStream = request.getInputStream();
            ByteArrayOutputStream outSteam = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len = 0;
            while ((len = inStream.read(buffer)) != -1) {
                outSteam.write(buffer, 0, len);
            }
            outSteam.close();
            inStream.close();
            String resultStr = new String(outSteam.toByteArray(), "utf-8");
            requestMap = net.sf.json.JSONObject.fromObject(resultStr);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return requestMap;
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
