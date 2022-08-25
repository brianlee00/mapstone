package learn.cyburbia.domain;

import learn.cyburbia.data.ProjectRepository;
import learn.cyburbia.models.Project;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> findAll() {
        return repository.findAll();
    }

    public Project findById(int projectId) { return repository.findById(projectId); }

    public Result<Project> add(Project project) {
        Result<Project> result = validate(project);
        if (!result.isSuccess()) {
            return result;
        }

        if (project.getProjectId() != 0) {
            result.addMessage("projectId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        project = repository.add(project);
        result.setPayload(project);
        return result;
    }

    public Result<Project> update(Project project) {
        Result<Project> result = validate(project);
        if (!result.isSuccess()) {
            return result;
        }

        if (project.getProjectId() <= 0) {
            result.addMessage("projectId must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(project)) {
            String msg = String.format("projectId: %s, not found", project.getProjectId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int projectId, int locationId) {
        return repository.deleteById(projectId, locationId);
    }

    private Result<Project> validate(Project project) {
        Result<Project> result = new Result<>();
        if (project == null) {
            result.addMessage("project cannot be null", ResultType.INVALID);
            return result;
        }
        if (project.getLocationId() < 1) {
            result.addMessage("location must be set for this project", ResultType.INVALID);
        }

        if (project.getAgencyId() < 1) {
            result.addMessage("agency must be set for this project", ResultType.INVALID);
        }

        if (project.getSqFt() < 0) {
            result.addMessage("sq ft. must be positive", ResultType.INVALID);
        }

        if (project.getProjectType() == null) {
            result.addMessage("project type is required", ResultType.INVALID);
        }

        if (project.getStatus() == null) {
            result.addMessage("status is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(project.getDescription())) {
            result.addMessage("description is required", ResultType.INVALID);
        }

        if (project.getBudget() != null) {
            if (project.getBudget().intValue() < 0) {
                result.addMessage("budget must be positive", ResultType.INVALID);
            }
        }

        return result;
    }

}
