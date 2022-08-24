package learn.cyburbia.domain;

import learn.cyburbia.data.AgencyRepository;
import learn.cyburbia.models.Agency;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AgencyServiceTest {

    @Autowired
    AgencyService service;

    @MockBean
    AgencyRepository agencyRepository;


    @Test
    void shouldAdd() {
        Agency agency = new Agency("Test", "test@agency.com", 4);
        Agency mockOut = new Agency("Test", "test@agency.com", 4);

        when(agencyRepository.add(agency)).thenReturn(mockOut);

        Result<Agency> actual = service.add(agency);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddInvalidEmail() {
        Agency agency = new Agency("Test", "test@agency.com", 4);

        agency.setEmail("test");
        Result<Agency> actual = service.add(agency);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotAddBlankFields() {
        Agency agency = new Agency("Test", "test@agency.com", 4);

        agency.setName(null);
        Result<Agency> actual = service.add(agency);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        Agency agency = new Agency("test", "test@agency.com", 4);
        agency.setAgencyId(1);

        when(agencyRepository.update(agency)).thenReturn(true);
        Result<Agency> actual = service.update(agency);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateMissingID() {
        Agency agency = new Agency("test", "test@agency.com", 4);

        when(agencyRepository.update(agency)).thenReturn(false);
        Result<Agency> actual = service.update(agency);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotUpdateInvalid() {
        Agency agency = new Agency("", "test@agency.com", 4);

        Result<Agency> actual = service.update(agency);
        assertEquals(ResultType.INVALID, actual.getType());

        agency.setName("test");
        agency.setEmail("");
        actual = service.update(agency);
        assertEquals(ResultType.INVALID, actual.getType());

        agency.setEmail("test@agency.com");
        agency.setLocationId(0);
        actual = service.update(agency);
        assertEquals(ResultType.INVALID, actual.getType());
    }
}