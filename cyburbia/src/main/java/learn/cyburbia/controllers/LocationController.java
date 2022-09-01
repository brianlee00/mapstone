package learn.cyburbia.controllers;

import org.springframework.http.HttpStatus;

import learn.cyburbia.domain.LocationService;
import learn.cyburbia.domain.Result;
import learn.cyburbia.models.Location;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin (origins = {"*"})
    @RequestMapping("/api/location")
    public class LocationController {

        private final LocationService service;

        public LocationController(LocationService service) {
            this.service = service;
        }

        @GetMapping
        public List<Location> findAll() {
            return service.findAll();
        }

        @GetMapping("/{locationId}")
        public ResponseEntity<Location> findById(@PathVariable int locationId) {
            Location location = service.findById(locationId);
            if (location == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return ResponseEntity.ok(location);
        }

        @PostMapping
        public ResponseEntity<Object> add(@RequestBody Location location) {
            Result<Location> result = service.add(location);
            if (result.isSuccess()) {
                return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
            }
            return ErrorResponse.build(result);
        }

        @PutMapping("/{locationId}")
        public ResponseEntity<Object> update(@PathVariable int locationId, @RequestBody Location location) {
            if (locationId != location.getLocationId()) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }

            Result<Location> result = service.update(location);
            if (result.isSuccess()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return ErrorResponse.build(result);
        }

       /* @DeleteMapping("/{locationId}")
        public ResponseEntity<Void> deleteById(@PathVariable int locationId) {
            if (service.deleteById(locationId)) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }*/

}
