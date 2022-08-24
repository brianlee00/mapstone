package learn.cyburbia.data;

import learn.cyburbia.models.Project;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProjectRepository {

    List<Project> findAll();

    Project findById(int projectId);

    Project add(Project project);

    boolean update(Project project);

    @Transactional
    boolean deleteById(int projectId, int locationId);
}
