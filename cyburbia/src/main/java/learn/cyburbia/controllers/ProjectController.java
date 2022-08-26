package learn.cyburbia.controllers;

import learn.cyburbia.domain.ProjectService;
import learn.cyburbia.domain.Result;
import learn.cyburbia.models.Project;
import org.apache.tomcat.jni.Error;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin (origins = {"*"})
@RequestMapping("/api/project")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> findAll() {
        return projectService.findAll();
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> findById(@PathVariable int projectId) {
        Project project = projectService.findById(projectId);
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(project);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Project project) {
        Result<Project> result = projectService.add(project);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Object> update(@PathVariable int projectId, @RequestBody Project project) {
        if (projectId != project.getProjectId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Project> result = projectService.update(project);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
