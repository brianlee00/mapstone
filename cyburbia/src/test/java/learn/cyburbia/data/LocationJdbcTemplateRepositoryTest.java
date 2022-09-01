package learn.cyburbia.data;

import learn.cyburbia.models.Agency;
import learn.cyburbia.models.Location;
import learn.cyburbia.models.State;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
//        (webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class LocationJdbcTemplateRepositoryTest {

    @Autowired
    LocationJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindLocations() {
        List<Location> locations = repository.findAll();
        assertNotNull(locations);
        assertEquals(10, locations.size());
    }

    @Test
    void shouldFindById() {
        Location actual = repository.findById(1);
        assertNotNull(actual);
        assertEquals("NY", actual.getState().getAbbr());
        assertEquals("Brooklyn", actual.getCity());
        assertEquals("11201", actual.getZipCode());
    }

    @Test
    void shouldAdd() {
        Location location = makeLocation();
        Location actual = repository.add(location);
        assertNotNull(actual);
        assertEquals(10, actual.getLocationId());

    }

    @Test
    void shouldUpdate() {
        Location location = makeLocation();
        location.setLocationId(1);
        assertTrue(repository.update(location));
        location.setLocationId(16);
        assertFalse(repository.update(location));
    }

    Location makeLocation() {
        Location location = new Location();
        location.setAddress("123 Test Ave.");
        location.setCity("Test City");
        location.setState(State.ALABAMA);
        location.setZipCode("TS-5555");
        return location;
    }

}
