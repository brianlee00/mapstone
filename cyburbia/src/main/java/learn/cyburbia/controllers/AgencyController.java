package learn.cyburbia.controllers;

import learn.cyburbia.domain.AgencyService;
import learn.cyburbia.domain.Result;
import learn.cyburbia.models.Agency;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin (origins = {"*"})
@RequestMapping("/api/agency")
public class AgencyController {

    private final AgencyService agencyService;

    public AgencyController(AgencyService agencyService) {
        this.agencyService = agencyService;
    }

    @GetMapping
    public List<Agency> findAll() {
        return agencyService.findAll();
    }

    @GetMapping("/{agencyId}")
    public ResponseEntity<Agency> findById(@PathVariable int agencyId) {
        Agency agency = agencyService.findById(agencyId);
        if (agency == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(agency);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Agency agency) {
        Result<Agency> result = agencyService.add(agency);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{agencyId}")
    public ResponseEntity<Object> update(@PathVariable int agencyId, @RequestBody Agency agency) {
        if (agencyId != agency.getAgencyId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Agency> result = agencyService.update(agency);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

//    @DeleteMapping("/{agencyId}")
//    public ResponseEntity<Void> deleteById(@PathVariable int agencyId) {
//        if (agencyService.deleteById(agencyId)) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }
}
