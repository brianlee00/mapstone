package learn.cyburbia.data;

import learn.cyburbia.models.Developer;
import learn.cyburbia.models.ProjectDeveloper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class ProjectDeveloperJdbcTemplateRepositoryTest {

    @Autowired
    ProjectDeveloperJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldAdd() {
        ProjectDeveloper projectDeveloper = makeProjectDeveloper();
        assertTrue(repository.add(projectDeveloper));

    }

//    @Test
//    void shouldUpdate() {
//        ProjectDeveloper projectDeveloper = makeProjectDeveloper();
//        projectDeveloper.setProjectId(3);
//        projectDeveloper.getDeveloper().setDeveloperId(3);
//        assertTrue(repository.update(projectDeveloper));
//
//        projectDeveloper.setProjectId(20);
//        assertFalse(repository.update(projectDeveloper));
//    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteByKey(2, 2));
        assertFalse(repository.deleteByKey(2, 2));
    }

    ProjectDeveloper makeProjectDeveloper() {
        ProjectDeveloper projectDeveloper = new ProjectDeveloper();
        projectDeveloper.setProjectId(1);

        Developer developer = new Developer();
        developer.setDeveloperId(1);
        developer.setName("Test");
        projectDeveloper.setDeveloper(developer);
        return projectDeveloper;
    }

}
