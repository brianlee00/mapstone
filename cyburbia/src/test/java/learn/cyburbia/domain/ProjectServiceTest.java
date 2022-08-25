package learn.cyburbia.domain;

import learn.cyburbia.data.ProjectRepository;
import learn.cyburbia.models.Agency;
import learn.cyburbia.models.Project;
import learn.cyburbia.models.ProjectType;
import learn.cyburbia.models.Status;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class ProjectServiceTest {

    @Autowired
    ProjectService service;

    @MockBean
    ProjectRepository repository;

    @Test
    void shouldAdd() {
        Project project = makeProject();
        Project project1 = makeProject();
        when(repository.add(project)).thenReturn(project1);

        Result<Project> actual = service.add(project);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(project1, actual.getPayload());
    }

    @Test
    void shouldNotAdd() {
        Project project = makeProject();
        project.setBudget(BigDecimal.valueOf(-1));
        Result<Project> actual = service.add(project);
        assertEquals(ResultType.INVALID, actual.getType());

        project = makeProject();
        project.setStatus(null);
        actual = service.add(project);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        Project project = makeProject();
        project.setProjectId(1);

        when(repository.update(project)).thenReturn(true);
        Result<Project> actual = service.update(project);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateMissingId() {
        Project project = makeProject();

        when(repository.update(project)).thenReturn(false);
        Result<Project> actual = service.update(project);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotUpdate() {
        Project project = makeProject();
        project.setLocationId(-1);

        Result<Project> actual = service.update(project);
        assertEquals(ResultType.INVALID, actual.getType());

        project.setLocationId(1);
        project.setDescription("");
        actual = service.update(project);
        assertEquals(ResultType.INVALID, actual.getType());

        project.setDescription("test");
        project.setSqFt(-2);
        actual = service.update(project);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldDelete() {
        when(repository.deleteById(2, 1)).thenReturn(true);
        assertTrue(service.deleteById(2, 1));
    }

    @Test
    void shouldNotDeleteMissing() {
        when(repository.deleteById(10, 3)).thenReturn(false);
        assertFalse(service.deleteById(10, 3));
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
