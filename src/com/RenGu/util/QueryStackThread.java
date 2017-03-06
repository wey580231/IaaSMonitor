package com.RenGu.util;

import com.RenGu.util.HttpServers;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

/**
 * Created by wey580231 on 2017/2/28.
 */
public class QueryStackThread implements Runnable {

    private String token;
    private String requestUrl;
    private String frontId;

    public QueryStackThread(String token, String stackInfoUrl,String id) {
        this.token = token;
        this.requestUrl = stackInfoUrl;
        this.frontId = id;
    }

    @Override
    public void run() {
        String stackStaue = "";
        HashMap<String, String> hashMap = new HashMap<>();
        int k = 0;
        while (!stackStaue.equals("CREATE_COMPLETE")) {
            k = k + 1;
            String stackReaultInfo = HttpServers.doGet(requestUrl, token);
            try {
                JSONObject stackReaultInfoJsonObject = new JSONObject(stackReaultInfo);
                JSONObject stackJsonObject = stackReaultInfoJsonObject.getJSONObject("stack");
                stackStaue = stackJsonObject.getString("stack_status");

                if (stackStaue.equals("CREATE_FAILED")) {
                    String errorMessage = stackJsonObject.getString("stack_status_reason");
                    System.out.println(CommonUtil.getWrappMessge("000001", errorMessage,frontId));
                    return;
                }
                if (stackJsonObject.has("outputs")) {
                    JSONArray outpuJsonArray = stackJsonObject.getJSONArray("outputs");
                    for (int i = 0; i < outpuJsonArray.length(); i++) {
                        String NodeName = outpuJsonArray.getJSONObject(i).getString("output_key");
                        String NodeIP = outpuJsonArray.getJSONObject(i).getString("output_value");

                        if (NodeName.equals("Slave_Instances_Group_Networks")) {
                            JSONArray innerArray = outpuJsonArray.getJSONObject(i).getJSONArray("output_value");
                            String result = "";
                            for (int j = 0; j < innerArray.length(); j++) {
                                String tmpIp = innerArray.get(j).toString();
                                if (j < innerArray.length() - 1) {
                                    result += (tmpIp + "|");
                                } else {
                                    result += tmpIp;
                                }
                            }
                            hashMap.put(NodeName, result);
                        } else {
                            hashMap.put(NodeName, NodeIP);
                        }
                    }
                }
                //减少访问的次数
                Thread.sleep(5 * 1000);

            } catch (JSONException e) {
                e.printStackTrace();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        System.out.println("总计执行：" + k + "次");

        if (hashMap.size() >= 5) {
            String[] ips = new String[hashMap.size()];
            ips[0] = hashMap.get("Master_Instances_public_ip");
            ips[1] = hashMap.get("Master_Instances_private_ip");
            ips[2] = hashMap.get("Slave_InstancesNode_1_private_ip");
            ips[3] = hashMap.get("Slave_InstancesNode_2_private_ip");
            ips[4] = hashMap.get("Slave_Instances_Group_Networks");

            String[] nameArray = new String[hashMap.size()];
            String[] passArray = new String[hashMap.size()];

            for (int i = 0; i < hashMap.size(); i++) {
                nameArray[i] = "root";
                passArray[i] = "123456";
            }

            String splitFlag = "|";

            String result = CommonUtil.getRightMessage("000000", CommonUtil.arryToString(ips, splitFlag), CommonUtil.arryToString(nameArray, splitFlag), CommonUtil.arryToString(passArray, splitFlag),frontId);
            String sendResutl = HttpServers.sendBackStackInfo("http://172.17.70.202:9090/create_return.action", result);
        } else {
            System.out.println(CommonUtil.getWrappMessge("000001", "Create Failed!",frontId));
        }
    }
}
