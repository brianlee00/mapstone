package learn.cyburbia.data;

import learn.cyburbia.models.Developer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
//        (webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class DeveloperJdbcTemplateRepositoryTest {

    @Autowired
    DeveloperJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Developer> developers = repository.findAll();
        assertNotNull(developers);
        assertTrue(developers.size() > 0);
    }

    @Test
    void shouldFindDev1() {
        Developer developer = repository.findById(1);
        assertEquals("Gotham City Real Estate, LLC", developer.getName());
    }

    @Test
    void shouldAdd() {
        Developer developer = makeDeveloper();
        Developer actual = repository.add(developer);
        assertNotNull(actual);
        assertEquals(4, actual.getDeveloperId());
    }

    @Test
    void shouldUpdate() {
        Developer developer = makeDeveloper();
        developer.setDeveloperId(3);
        assertTrue(repository.update(developer));
        developer.setDeveloperId(13);
        assertFalse(repository.update(developer));
    }

    private Developer makeDeveloper() {
        Developer developer = new Developer();
        developer.setName("new developer");
        developer.setEmail("dev@gmail.com");
        developer.setLocationId(3);
        return developer;
    }

}
