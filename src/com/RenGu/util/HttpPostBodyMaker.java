package com.RenGu.util;

/**
 * Created by hanch on 2017/2/9.
 */
public class HttpPostBodyMaker {
    public static String createMultipleServers(String name, String imageRef, int flavorRef, boolean return_reservation_id, int min_count, int max_count) {
        String return_reservation_idNode = "\"return_reservation_id\": \"" + return_reservation_id + "\",";
        String min_countNode = "\"min_count\":\"" + min_count + "\",";
        String max_countNode = "\"max_count\": \"" + max_count + "\"";
        String httpPostBody = "{\"server\":{\"name\":\"new-server-test\",\"imageRef\":\"70a599e0-31e7-49b7-b260-868f441e862b\",\"flavorRef\":\"1\",\"metadata\":{\"My Server Name\":\"Apache1\"},\"return_reservation_id\":\"True\",\"min_count\":\"2\",\"max_count\":\"3\"}}";
        return httpPostBody;
    }
}
