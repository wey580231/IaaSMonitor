package com.RenGu.util;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

public class DesUtil {

    /**
     * 将组成签名的参数排序
     *
     * @param requestParams 签名参数组
     * @return 去掉空值与签名参数后的新签名参数组
     */
    public static String getSignStr(Map<String, String> mapJson) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        String result = "";
        for (String key : mapJson.keySet()) {
            String value = (String) mapJson.get(key);
            if (key.equalsIgnoreCase("sign")) {
                continue;
            }
            resultMap.put(key, value);
        }
        result = createLinkString(resultMap);
        return result;
    }

    /**
     * 把数组所有元素排序，并按照“参数”的字符拼接成字符串
     *
     * @param params 需要排序并参与字符拼接的参数组
     * @return 拼接后字符串
     */
    public static String createLinkString(Map<String, Object> params) {
        List<String> keys = new ArrayList<String>(params.keySet());
        Collections.sort(keys);
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < keys.size(); i++) {
            String key = keys.get(i);
            String value = params.get(key).toString();
            sb.append(key + "=" + value + "&");
        }
        return sb.toString();
    }

    public static String encryptBasedDes(String data, String des_key) {
        String encryptedData = null;
        try {
            // DES算法要求有一个可信任的随机数源
            SecureRandom sr = new SecureRandom();
            DESKeySpec deskey = new DESKeySpec(des_key.getBytes());
            // 创建一个密匙工厂，然后用它把DESKeySpec转换成一个SecretKey对象
            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
            SecretKey key = keyFactory.generateSecret(deskey);
            // 加密对象
            Cipher cipher = Cipher.getInstance("DES");
            cipher.init(Cipher.ENCRYPT_MODE, key, sr);
            // 加密，并把字节数组编码成字符串
            encryptedData = new sun.misc.BASE64Encoder().encode(cipher.doFinal(data.getBytes()));
        } catch (Exception e) {
            throw new RuntimeException("加密错误，错误信息：", e);
        }

        encryptedData = encryptedData.replaceAll("\\/", "");
        encryptedData = encryptedData.replaceAll("\\+", "");
        encryptedData = encryptedData.replaceAll("\\=", "");
        encryptedData = encryptedData.replaceAll("\r\n", "");//转换换行
        encryptedData = encryptedData.replaceAll("\n", "");//转换换行
        return encryptedData;
    }
}
