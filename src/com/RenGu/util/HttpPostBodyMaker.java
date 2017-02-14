package com.RenGu.util;

/**
 * Created by hanch on 2017/2/9.
 */
public class HttpPostBodyMaker {
    public static String createMultipleServers(String name, String imageRef, String flavorRef, boolean return_reservation_id, int min_count, int max_count) {
        String return_reservation_idNode = "\"return_reservation_id\": \"" + return_reservation_id + "\",";
        String min_countNode = "\"min_count\":\"" + min_count + "\",";
        String max_countNode = "\"max_count\": \"" + max_count + "\"";
        String httpPostBody = "{\"server\":{\"name\":\"new-server-test\",\"imageRef\":\"70a599e0-31e7-49b7-b260-868f441e862b\",\"flavorRef\":\"1\",\"metadata\":{\"My Server Name\":\"Apache1\"}," + return_reservation_idNode + "" + min_countNode + "" + max_countNode + "}}";
        System.out.println(httpPostBody);
        return httpPostBody;
    }

    public static String createServer(String name, String flavorRef, String imageRef, String securityGroupsName, String accessIPv4, String adminPass, String networksUUID) {
        String security_groupsNode = "\"security_groups\":[{\"name\":\"" + securityGroupsName + "\"}],";
        if (securityGroupsName == null) {
            security_groupsNode = "";
        }
        String networksNode = "\"networks\":[{\"uuid\":\"" + networksUUID + "\"}],";
        String httpPostBody = "{\"server\":{\"" + name + "\":\"new-server-test\",\"flavorRef\":\"" + flavorRef + "\",\"imageRef\":\"" + imageRef + "\"," + security_groupsNode + "\"accessIPv4\":\"" + accessIPv4 + "\",\"adminPass\":\"" + adminPass + "\"," + networksNode + "\"OS-DCF:diskConfig\":\"AUTO\",\"personality\":[{\"path\":\"/etc/banner.txt\",\"contents\":\"ICAgICAgDQoiQSBjbG91ZCBkb2VzIG5vdCBrbm93IHdoeSBp dCBtb3ZlcyBpbiBqdXN0IHN1Y2ggYSBkaXJlY3Rpb24gYW5k IGF0IHN1Y2ggYSBzcGVlZC4uLkl0IGZlZWxzIGFuIGltcHVs c2lvbi4uLnRoaXMgaXMgdGhlIHBsYWNlIHRvIGdvIG5vdy4g QnV0IHRoZSBza3kga25vd3MgdGhlIHJlYXNvbnMgYW5kIHRo ZSBwYXR0ZXJucyBiZWhpbmQgYWxsIGNsb3VkcywgYW5kIHlv dSB3aWxsIGtub3csIHRvbywgd2hlbiB5b3UgbGlmdCB5b3Vy c2VsZiBoaWdoIGVub3VnaCB0byBzZWUgYmV5b25kIGhvcml6 b25zLiINCg0KLVJpY2hhcmQgQmFjaA==\"}]},\"OS-SCH-HNT:scheduler_hints\":{\"same_host\":\"48e6a9f6-30af-47e0-bc04-acaed113bb4e\"}}";
        return httpPostBody;
    }

    public static String createUser(String userName, String passWord, String enabled, String domain_id) {
        String httpPostBody = "{\"user\": {\"domain_id\": \"" + domain_id + "\",\"enabled\": " + enabled + ",\"name\": \"" + userName + "\",\"password\": \"" + passWord + "\"}}";
        return httpPostBody;
    }
}
