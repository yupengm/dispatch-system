package com.dispatch;

import com.dispatch.dao.StationDao;
import com.dispatch.entity.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class DbInit {

    @Autowired
    private Station station;

    @Autowired
    private StationDao stationDao;

    @PostConstruct
    private void postConstruct() {
        Station station1 = new Station();
        station1.setName("SanFranciscoStateUniversity");
        station1.setLatitude(37.725012099170854);
        station1.setLongitude(-122.47986516603898);

        Station station2 = new Station();
        station2.setName("UniversityOfSanFrancisco");
        station2.setLatitude(37.77654899964165);
        station2.setLongitude(-122.45075438928644);

        Station station3 = new Station();
        station3.setName("BernalHeightsPark");
        station3.setLatitude(37.74336758244373);
        station3.setLongitude(-122.41411171945718);

    }



}
