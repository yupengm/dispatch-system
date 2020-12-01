package com.dispatch.service;


        import com.dispatch.dao.StationDao;
        import com.dispatch.entity.Station;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

        import javax.annotation.PostConstruct;


@Service
public class StationService {
    @Autowired
    private StationDao stationDao;

    @PostConstruct
    private void postConstruct(){  // initialize stations: add stations in the database:
        // "SanFranciscoStateUniversity": 37.725012099170854, -122.47986516603898
        // "UniversityOfSanFrancisco": 37.77659175985596, -122.45072433249807
        // "BernalHeightsPark": 37.74336758244373, -122.41411171945718
        Station station1 = new Station();
        Station station2 = new Station();
        Station station3 = new Station();
        station1.setName("SanFranciscoStateUniversity");
        station2.setName("UniversityOfSanFrancisco");
        station3.setName("BernalHeightsPark");
        station1.setLatitude(37.725012099170854);
        station2.setLatitude(-122.47986516603898);
        station3.setLatitude(37.77659175985596);
        station1.setLongitude(-122.45072433249807);
        station2.setLongitude(37.74336758244373);
        station3.setLongitude(-122.41411171945718);
        station1.setDroneAvailable(Integer.MAX_VALUE);
        station1.setRobotAvailable(Integer.MAX_VALUE);
        station2.setDroneAvailable(Integer.MAX_VALUE);
        station2.setRobotAvailable(Integer.MAX_VALUE);
        station3.setDroneAvailable(Integer.MAX_VALUE);
        station3.setRobotAvailable(Integer.MAX_VALUE);
        stationDao.addStation(station1);
        stationDao.addStation(station2);
        stationDao.addStation(station3);
    }
}
