package learn.cyburbia.controllers;

import learn.cyburbia.domain.ProjectService;
import learn.cyburbia.domain.Result;
import learn.cyburbia.models.ProjectDeveloper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin //(origins = {"http://localhost:3000"})
@RequestMapping("/api/project/developer")
public class ProjectDeveloperController {

    private final ProjectService service;

    public ProjectDeveloperController(ProjectService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody ProjectDeveloper projectDeveloper) {
        Result<Void> result = service.addDeveloper(projectDeveloper);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{projectId}/{developerId}")
    public ResponseEntity<Void> deleteByKey(@PathVariable int projectId, @PathVariable int developerId) {
        if (service.deleteDeveloperByKey(projectId, developerId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
