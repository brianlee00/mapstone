package learn.cyburbia.data;
import learn.cyburbia.models.Agency;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AgencyJdbcTemplateRepositoryTest {

    @Autowired
    AgencyJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAgencies() {
        List<Agency> agencies = repository.findAll();
        assertNotNull(agencies);
        assertEquals(4,agencies.size());
    }

    @Test
    void shouldFindNYUDA() {
        Agency nyuda = repository.findById(1);
        assertEquals("New York Urban Development Authority", nyuda.getName());
        assertNotNull(nyuda.getEmail());
        assertEquals(1, nyuda.getLocationId());
    }

    @Test
    void shouldAddAgency() {
        Agency agency = new Agency();
        agency.setName("TEST");
        agency.setEmail("Test@g.com");
        agency.setLocationId(3);
        Agency actual = repository.add(agency);
        assertNotNull(actual);
        assertEquals(4, actual.getAgencyId());
    }

    @Test
    void shouldUpdateAgency() {

        Agency agency = new Agency();
        agency.setAgencyId(3);
        agency.setName("TEST");
        agency.setEmail("testing@test.com");
        agency.setLocationId(5);
        assertTrue(repository.update(agency));
        assertEquals("TEST", agency.getName());
    }


}
