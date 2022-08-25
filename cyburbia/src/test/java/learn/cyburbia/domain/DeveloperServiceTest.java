package learn.cyburbia.domain;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import learn.cyburbia.data.DeveloperRepository;
import learn.cyburbia.models.Developer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class DeveloperServiceTest {

    @Autowired
    DeveloperService service;

    @MockBean
    DeveloperRepository repository;

    @Test
    void shouldAdd() {
        Developer developer = makeDeveloper();
        Developer developer1 = makeDeveloper();

        when(repository.add(developer)).thenReturn(developer1);

        Result<Developer> actual = service.add(developer);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(developer1, actual.getPayload());
    }

    @Test
    void shouldNotAddInvalidEmail() {
        Developer developer = makeDeveloper();

        developer.setEmail("test");
        Result<Developer> actual = service.add(developer);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotAddBlankFields() {
        Developer developer = makeDeveloper();

        developer.setName(null);
        Result<Developer> actual = service.add(developer);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        Developer developer = makeDeveloper();
        developer.setDeveloperId(1);

        when(repository.update(developer)).thenReturn(true);
        Result<Developer> actual = service.update(developer);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateMissingID() {
        Developer developer = makeDeveloper();

        when(repository.update(developer)).thenReturn(false);
        Result<Developer> actual = service.update(developer);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotUpdateInvalid() {
        Developer developer = makeDeveloper();
        developer.setName("");

        Result<Developer> actual = service.update(developer);
        assertEquals(ResultType.INVALID, actual.getType());

        developer.setName("test");
        developer.setEmail("");
        actual = service.update(developer);
        assertEquals(ResultType.INVALID, actual.getType());

        developer.setEmail("test@agency.com");
        developer.setLocationId(0);
        actual = service.update(developer);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    private Developer makeDeveloper() {
        Developer developer = new Developer();
        developer.setName("test name");
        developer.setEmail("test@gmail.com");
        developer.setLocationId(1);
        return developer;
    }
}
