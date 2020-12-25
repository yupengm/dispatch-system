package com.dispatch.external;
import com.dispatch.Secret;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import com.dispatch.Secret;

import java.io.IOException;



public class GoogleMapClient {
    private static String KEY = Secret.GoogleKEY;
    private static final String EXTRACT_URL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=";
    private static final String FORMAT_URL = "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=";


//
//    //The following example shows a Find Place request for "Museum of Contemporary Art Australia",
//    // including the photos, formatted_address, name, rating, opening_hours, and geometry fields:
//    String request = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY";
//
//     "900 S Clark, Chicago, IL";
//    public static String request1 = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=900%20S%20Clark%20Chicago%20IL&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY";
//
//    //189 Prairie Run, Edmond, OK
//    String request2 = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=189%20Prairie%20Run%20Edmond%20OK&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBuoOrk0v4p_2Q-Pb7xymPwQoJvDP9v-ck";
//
//    Wrong case
//    asdasdasdasd
//    public static String request3 = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=asdasdasdasd&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBuoOrk0v4p_2Q-Pb7xymPwQoJvDP9v-ck";

    public String getLocation(String input) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        StringBuilder URL = new StringBuilder(EXTRACT_URL);
        input = input.replace(",","");

        // format URL
        for(String ele: input.split(" ")) {
            URL.append(ele);
            URL.append("%20");
        }
        URL.delete(URL.length() - 3, URL.length());
        URL.append(FORMAT_URL);
        URL.append(KEY);
//        System.out.println(URL);


        ResponseHandler<String> responseHandler = new ResponseHandler<String>() {
            @Override
            public String handleResponse(HttpResponse response) throws ClientProtocolException, IOException {
                if (response.getStatusLine().getStatusCode() != 200) {
                    return null;
                }
                HttpEntity entity = response.getEntity();

                // get String from google api response
                String responseXml = EntityUtils.toString(response.getEntity());

//                // return all json as string
//                return responseXml;


                // form a String "lat,lng"
                String[] allContent = responseXml.split("\\{");

                // if there is standard output, will have split array with length 2
                if(allContent.length < 3) {
                    return null;
                }
                String[] result = allContent[4].split(" ");

//                for(int i = 0; i < result.length; i++) {
//                    System.out.println(i  +result[i]);
//                } // 17,34 -> to get information

                String toReturn = result[17] + result[34];
                toReturn = toReturn.replace("\n","");

                return toReturn;
            }
        };

        HttpPost request = new HttpPost(URL.toString());
        request.setHeader("Content-type", "application/json");
        String all = null;

        try {
             all = httpClient.execute(request, responseHandler);

            httpClient.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            return all;
        }

    }

    public static void main(String[] args) {
        GoogleMapClient a = new GoogleMapClient();

//        a.getLocation("189 Prairie Run, Edmond, OK");
//        a.getLocation("Museum of Contemporary Art Australia");
//          a.getLocation("asdasdasdasd");
        System.out.println(a.getLocation("asdasdasdasd"));
    }
}
