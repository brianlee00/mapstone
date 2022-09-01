package learn.cyburbia.domain;
import learn.cyburbia.data.LocationRepository;
import learn.cyburbia.models.Location;
import learn.cyburbia.models.State;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
//        (webEnvironment = SpringBootTest.WebEnvironment.NONE)
class LocationServiceTest {

    @Autowired
    LocationService service;

    @MockBean
    LocationRepository repository;

    @Test
    void shouldNotAddWhenInvalid() {
        Location location = makeLocation();
        location.setAddress(null);
        Result<Location> actual = service.add(location);
        assertEquals(ResultType.INVALID, actual.getType());

        location = makeLocation();
        location.setCity("\t");
        actual = service.add(location);
        assertEquals(ResultType.INVALID, actual.getType());

        location = makeLocation();
        location.setState(null);
        actual = service.add(location);
        assertEquals(ResultType.INVALID, actual.getType());

        location = makeLocation();
        location.setZipCode(" ");
        actual = service.add(location);
        assertEquals(ResultType.INVALID, actual.getType());
    }
    @Test
    void shouldNotAddDuplicate() {
        Location location = makeLocation();
        Location mockOut = makeLocation();
        mockOut.setLocationId(1);

        when(repository.add(location)).thenReturn(mockOut);

        Location locationTwo = makeLocation();
        locationTwo.setLocationId(2);

        Result<Location> actual = service.add(location);
        assertEquals(ResultType.SUCCESS, actual.getType());

        Result<Location> actualTwo = service.add(locationTwo);
        assertEquals(ResultType.INVALID, actualTwo.getType());



    }

    @Test
    void shouldAdd() {
        Location location = makeLocation();
        Location mockOut = makeLocation();
        mockOut.setLocationId(1);

        when(repository.add(location)).thenReturn(mockOut);

        Result<Location> actual = service.add(location);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Location location = makeLocation();
        Result<Location> actual = service.update(location);
        assertEquals(ResultType.INVALID, actual.getType());

        location = makeLocation();
        location.setLocationId(1);
        location.setZipCode(" ");
        actual = service.update(location);
        assertEquals(ResultType.INVALID, actual.getType());

        location = makeLocation();
        location.setLocationId(1);
        location.setCity(" ");
        actual = service.update(location);
        assertEquals(ResultType.INVALID, actual.getType());
    }


    @Test
    void shouldUpdate() {
        Location location = makeLocation();
        location.setLocationId(1);

        when(repository.update(location)).thenReturn(true);

        Result<Location> actual = service.update(location);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    Location makeLocation() {
        Location location = new Location();
        location.setAddress("Testing Street");
        location.setCity("Test City");
        location.setState(State.NEW_YORK);
        location.setZipCode("55555-PST");
        return location;
    }

}
