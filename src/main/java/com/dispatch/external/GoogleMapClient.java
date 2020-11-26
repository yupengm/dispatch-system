package com.dispatch.external;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.*;

public class GoogleMapClient {
    private final static String KEY = "AIzaSyBuoOrk0v4p_2Q-Pb7xymPwQoJvDP9v-ck" ;
    private static final String EXTRACT_URL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=";
    private static final String FORMAT_URL = "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=";


    String test = "900 S Clark, Chicago, IL";
    //The following example shows a Find Place request for "Museum of Contemporary Art Australia",
    // including the photos, formatted_address, name, rating, opening_hours, and geometry fields:
    String request = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY";

    public static String request1 = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=900%20S%20Clark%20Chicago%20IL&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY";

    //189 Prairie Run, Edmond, OK
    String request2 = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=189%20Prairie%20Run%20Edmond%20OK&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY";

    public String getLocation(String input) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        StringBuilder URL = new StringBuilder(EXTRACT_URL);
        input = input.replace(",","");

        // format URL
        for(String ele: input.split(" ")) {
            URL.append(ele);
            URL.append("%20");
        }
        URL.delete(URL.length() - 3,URL.length());
        URL.append(FORMAT_URL);
        URL.append(KEY);
//        System.out.println(URL);

        //
        ResponseHandler<String> responseHandler = new ResponseHandler<String>() {
            @Override
            public String handleResponse(HttpResponse response) throws ClientProtocolException, IOException {
                if (response.getStatusLine().getStatusCode() != 200) {
                    return "empty";
                }
                HttpEntity entity = response.getEntity();

                if (entity == null) {
                    return "empty";
                }

                String responseXml = EntityUtils.toString(response.getEntity());
                String[] allContent = responseXml.split(" ");
                Boolean toPrint = false;
//                for(String cur : allContent) {
//                        System.out.println(cur);
//                }
                return responseXml;
            }
        };

        HttpPost request = new HttpPost(URL.toString());
        request.setHeader("Content-type", "application/json");
        String all = null;

        try {
             all = httpClient.execute(request, responseHandler);
//            System.out.println();
//            for(String cur : all) {
//                System.out.print(all);
//            }
            httpClient.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            return all;
        }

    }

    public static void main(String[] args) {
        GoogleMapClient a = new GoogleMapClient();
        System.out.println(a.getLocation("900 S Clark, Chicago, IL"));
    }
}
