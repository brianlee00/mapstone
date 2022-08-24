package learn.cyburbia.domain;

import learn.cyburbia.data.ProjectRepository;
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
    ProjectRepository projectRepository;

    @Test
    void shouldNotAdd() {
        Project project = makeProject();
        project.setBudget(BigDecimal.valueOf(-1));
        Result<Project> actual = service.add(project);
        assertEquals(ResultType.INVALID, actual.getType());
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
