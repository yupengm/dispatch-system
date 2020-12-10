package com.dispatch.external;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GoogleMapPolylineDecoder {
    public List<List<Double>> decodePolyline(String polylineUrl){
        int index = 0;
        int lat = 0;
        int lng = 0;
        List<List<Double>> toReturn = new ArrayList<>();
        List<Coordinate> coordinates = new ArrayList<>();
        String[] array = {"latitude", "longitude"};
        Map<String, Integer> changes = new HashMap<>();
        changes.put("latitude", 0);
        changes.put("longitude", 0);

        while (index < polylineUrl.length()){
            for (String unit: array){
                int shift = 0;
                int result = 0;
                while (true){
                    int byteCurrent = (int)(polylineUrl.charAt(index)) - 63;
                    index += 1;
                    result |= (byteCurrent & 0x1f) << shift;
                    shift += 5;
                    if (byteCurrent < 0x20){
                        break;
                    }
                }
                if ((result & 1) != 0){
                    changes.put(unit, ~(result >> 1));
                } else {
                    changes.put(unit, result >> 1);
                }
            }
            lat += changes.get("latitude");
            lng += changes.get("longitude");
            coordinates.add(new Coordinate(lat / 100000.0, lng / 100000.0));
        }
        for (Coordinate coordinate: coordinates){
            List<Double> point = new ArrayList<>();
            point.add(coordinate.latitude);
            point.add(coordinate.longitude);
            toReturn.add(point);
        }
        return toReturn;
    }

    static class Coordinate{
        double latitude;
        double longitude;

        Coordinate(double latitude, double longitude){
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }

    public static void main (String[] args){
//        String url = "azljFjss{S?oA?kB";
        String url = "cgqeFt_djVvAlB~@pAh@s@jA_B|BaDx@hAdArAR[v@cAf@s@jIaLnGuINWJ_AD_@XoAl@qAtAeCf@_AxA{BdAwA|@uAXUTMf@[h@Sn@Kf@EfAGPCRIHGPAh@Cr@C~CQtCIr@@z@D|@JlAZ|@X`ClApBbA~@Zj@Lz@Jt@@~@CbAOjA]j@Yp@c@nAkAlAeBnAoBh@s@hAiAx@i@ZOtAa@v@MfG[dH[lACtB@dBNhAN~EdAvK`C`H~AfE|@zCr@fA`@|@`@fAn@|AjAzDzCbAp@pAr@^PlAb@nCp@~@LrBP~AF^NT?|CEjCCp@@xARRDbA\\xAx@n@f@z@v@l@p@v@jAl@dArAbDNXFFLHVn@nAxCz@rBlAbDp@~Bj@vCL~@RbCFhCC`L@`CDfBDjAP`Cv@lKNlHG`CCf@M`CMhBcB|NOdCIlC@zBFdBR`C\\`CpA|Hz@zEbAjFrB`Jv@~CR~@lBpG`ClHHXj@vAp@xAl@hAx@tAj@t@l@v@`BhB`BzAvAlAdBhAxAv@pB~@hDjA~Cr@xC`@zBPdH`@hH`@lBLt@HhB`@lA`@rAn@`@V`An@jAhAfBpB|@dA|BtCHf@Rb@jAfBvBbD\\r@Ph@ZrA\\|@vA|B~@lADh@?ZFLCF?n@DPBH?x@?`D?jFBrPEvEEn@M`@Kb@[j@q@dAe@~@c@rAQx@MvACrAD|FB~DEfB_@tD]jDCxA@lFExAKf@YfA}@~Ca@nAcAlCwAnD[hAUvAEj@ErA?rABvGOtNKnMGdDAJEz@SVEDMBaAHy@AmDKmBEuCC_D?iGBeT@s@CKGGEKU?UFWdCwCXYF?FAJKFQAQIMOGKBKJc@{@aAyAS[EQH_EMwCEy@GEKC]mCGi@OsA@mH@gAJ?NBb@Fc@GOCK?AfA?VC~C@tBNrAd@vDJBFDBJNdEI~DDPtAtBb@z@CHAF?B?D]b@o@t@wBjCs@^_Cs@}FkB{Bq@q@CW@y@Ru@d@cAv@wAhAkBxAc@b@_@n@Sp@Kn@[xA[MsAi@q@Sg@E{KZ}GRAg@Cy@OkJW{NIcJKcFEaFG}HBqDuKXwLZgCJ_LZmHLuJZiM^i_@fAac@nAsJV_CLgEV_DP}Sn@gAFk@Hc@Pm@ZyA~@aA^s@Pu@J_BFmAHq@HwAb@sErBc@RQHy@Ta@BSCe@KYOUWUYM[Om@Ca@SgKI{BQqCAaA@{@JyABk@RaF@q@C_@Oo@S_@IISOSG[Gm@@MsHOgIOcKEkCKkCG{@FOSwCEs@C[q@}J]mFq@kKAi@MaAeAiPSeDk@_I[cF";
        GoogleMapPolylineDecoder g = new GoogleMapPolylineDecoder();
        List<List<Double>> output= g.decodePolyline(url);

        System.out.println(output);
        System.out.println(output.size());
        System.out.println(output.get(1).get(1));
    }


}
