package com.RenGu.util;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JSONParse {
    public static void loginJsonParse(String jsonString) {
        try {
            JSONObject jsonObject = new JSONObject(jsonString);
            //获取LoginJson中的Token向相关信息
            Token.setToken(jsonObject.getJSONObject("access").getJSONObject("token").getString("id"));
            Token.setExpires(jsonObject.getJSONObject("access").getJSONObject("token").getString("expires"));
            Token.setProjectID(jsonObject.getJSONObject("access").getJSONObject("token").getJSONObject("tenant").getString("id"));
            //获取LoginJson中的EndpointUrl向相关信息
            JSONArray jsonArray = jsonObject.getJSONObject("access").getJSONArray("serviceCatalog");
            for (int i = 0; i < jsonArray.length(); i++) {
                String serviceCatalogEndpointUrlType = jsonArray.getJSONObject(i).getString("type") + "EndpointUrl";
                String serviceCatalogEndpointUrl = "";

                JSONArray endpointsJSONArrays = jsonArray.getJSONObject(i).getJSONArray("endpoints");
                for (int j = 0; j < endpointsJSONArrays.length(); j++) {
                    serviceCatalogEndpointUrl = endpointsJSONArrays.getJSONObject(j).getString("adminURL");
                }

                OpenStackInfo.getOpenStackEndpointUrl().put(serviceCatalogEndpointUrlType, serviceCatalogEndpointUrl);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
