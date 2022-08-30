package learn.cyburbia.controllers;


import learn.cyburbia.domain.DeveloperService;
import learn.cyburbia.domain.Result;
import learn.cyburbia.models.Developer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @CrossOrigin (origins = {"*"})
    @RequestMapping("/api/developer")
    public class DeveloperController {

        private final DeveloperService service;

        public DeveloperController(DeveloperService service) {
            this.service = service;
        }

        @GetMapping
        public List<Developer> findAll() {
            return service.findAll();
        }

        @GetMapping("/{developerId}")
        public Developer findById(@PathVariable int developerId) {
            return service.findById(developerId);
        }

        @PostMapping
        public ResponseEntity<Object> add(@RequestBody Developer developer) {
            Result<Developer> result = service.add(developer);
            if (result.isSuccess()) {
                return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
            }
            return ErrorResponse.build(result);
        }

        @PutMapping("/{developerId}")
        public ResponseEntity<Object> update(@PathVariable int developerId, @RequestBody Developer developer) {
            if (developerId != developer.getDeveloperId()) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }

            Result<Developer> result = service.update(developer);
            if (result.isSuccess()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return ErrorResponse.build(result);
        }


    }
