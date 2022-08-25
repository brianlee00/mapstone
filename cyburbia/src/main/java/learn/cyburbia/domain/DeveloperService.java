package learn.cyburbia.domain;

import learn.cyburbia.data.DeveloperRepository;
import learn.cyburbia.models.Agency;
import learn.cyburbia.models.Developer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeveloperService {

    private final DeveloperRepository repository;

    public DeveloperService(DeveloperRepository repository) {
        this.repository = repository;
    }

    public List<Developer> findAll() { return repository.findAll(); }

    public Developer findById(int developerId) { return repository.findById(developerId); }

    public Result<Developer> add(Developer developer) {
        Result<Developer> result = validate(developer);
        if (!result.isSuccess()) {
            return result;
        }

        if (developer.getDeveloperId() != 0) {
            result.addMessage("Developer ID cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        List<Developer> developers = repository.findAll();
        for (Developer d : developers) {
            if (developer.getName().equalsIgnoreCase(d.getName())
                    && developer.getEmail().equalsIgnoreCase(d.getEmail())) {
                result.addMessage("Duplicate developer may not be added", ResultType.INVALID);
                return result;
            }
        }

        developer = repository.add(developer);
        result.setPayload(developer);
        return result;
    }

    public Result<Developer> update(Developer developer) {
        Result<Developer> result = validate(developer);
        if (!result.isSuccess()) {
            return result;
        }

        if (developer.getDeveloperId() <= 0) {
            result.addMessage("Developer ID must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(developer)) {
            String msg = String.format("Developer ID: %s, not found", developer.getDeveloperId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    private Result<Developer> validate(Developer developer) {
        Result<Developer> result = new Result<>();
        if (developer == null) {
            result.addMessage("Developer cannot be null", ResultType.INVALID);
            return result;
        }
        if (Validations.isNullOrBlank(developer.getName())) {
            result.addMessage("Name must be set for this developer", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(developer.getEmail())) {
            result.addMessage("Email must be set for this developer", ResultType.INVALID);
        }

        if (developer.getLocationId() < 1) {
            result.addMessage("Location must be set for this developer", ResultType.INVALID);
        }
        return result;
    }

}
