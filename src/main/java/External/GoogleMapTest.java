package External;

public class GoogleMapTest {
    final String Key = "AIzaSyBuoOrk0v4p_2Q-Pb7xymPwQoJvDP9v-ck" ;

    String test = "900 S Clark, Chicago, IL";
    //The following example shows a Find Place request for "Museum of Contemporary Art Australia",
    // including the photos, formatted_address, name, rating, opening_hours, and geometry fields:
    String request = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY";

    String request1 = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=900%20S%20Clark%20Chicago%20IL&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY";

    //189 Prairie Run, Edmond, OK
    String request2 = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=189%20Prairie%20Run%20Edmond%20OK&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY";

}
