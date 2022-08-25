package learn.cyburbia.data;

import learn.cyburbia.models.Project;
import learn.cyburbia.models.ProjectType;
import learn.cyburbia.models.Status;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class ProjectJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 4;

    @Autowired
    ProjectJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Project> projects = repository.findAll();
        assertNotNull(projects);

        assertTrue(projects.size() >= 2 && projects.size() <= 5);
    }

    @Test
    void shouldFindProject2() {
        Project project = repository.findById(2);
        assertEquals(2, project.getProjectId());
        assertEquals(30000, project.getSqFt());
        assertEquals(ProjectType.RES, project.getProjectType());
        assertEquals("Building Brotherly Love, Inc", project.getDevelopers().get(0).getDeveloper().getName());
    }

    @Test
    void shouldAdd() {
        Project project = makeProject();
        Project actual = repository.add(project);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getProjectId());
    }

    @Test
    void shouldUpdate() {
        Project project = makeProject();
        project.setProjectId(3);
        assertTrue(repository.update(project));
        project.setProjectId(13);
        assertFalse(repository.update(project));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById(2, 6));
        assertFalse(repository.deleteById(2, 6));
    }

    private Project makeProject() {
        Project project = new Project();
        project.setLocationId(1);
        project.setAgencyId(2);
        project.setSqFt(20000);
        project.setProjectType(ProjectType.COM);
        project.setStatus(Status.CON);
        project.setDescription("description");
        project.setBudget(BigDecimal.valueOf(1000000));
        return project;
    }

}
