package learn.cyburbia.domain;

import learn.cyburbia.data.LocationRepository;
import learn.cyburbia.models.Location;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
    public class LocationService {

        private final LocationRepository repository;

        public LocationService(LocationRepository repository) {
            this.repository = repository;
        }

        public List<Location> findAll() {return repository.findAll();}

        public Location findById(int locationId) {
            return repository.findById(locationId);
        }

        public Result<Location> add(Location location) {
            Result<Location> result = validate(location);
            if (!result.isSuccess()) {
                return result;
            }

            if (location.getLocationId() != 0) {
                result.addMessage("locationId cannot be set for `add` operation", ResultType.INVALID);
                return result;
            }

            location = repository.add(location);
            result.setPayload(location);
            return result;
        }

        public Result<Location> update(Location location) {
            Result<Location> result = validate(location);
            if (!result.isSuccess()) {
                return result;
            }

            if (location.getLocationId() <= 0) {
                result.addMessage("locationId must be set for `update` operation", ResultType.INVALID);
                return result;
            }

            if (!repository.update(location)) {
                String msg = String.format("locationId: %s, not found", location.getLocationId());
                result.addMessage(msg, ResultType.NOT_FOUND);
            }

            return result;
        }


        private Result<Location> validate(Location location) {
            Result<Location> result = new Result<>();

            if (location == null) {
                result.addMessage("Location Cannot be Null", ResultType.INVALID);
                return result;
            }

            if (Validations.isNullOrBlank(location.getAddress())) {
                result.addMessage("Address is Required", ResultType.INVALID);
            }

            if (Validations.isNullOrBlank(location.getCity())) {
                result.addMessage("City is Required", ResultType.INVALID);
            }

            if (location.getState() == null) {
                result.addMessage("State is Required", ResultType.INVALID);
            }

            if (Validations.isNullOrBlank(location.getZipCode())) {
                result.addMessage("Zip Code is required", ResultType.INVALID);
            }

            result = validateDuplicate(location, result);

            return result;
        }
        private Result<Location> validateDuplicate(Location location, Result<Location> result) {
            List<Location> all = repository.findAll();

            for (Location l : all) {
                if (l.getAddress().equalsIgnoreCase(location.getAddress()) && l.getCity().equalsIgnoreCase(location.getCity()) && l.getState() == location.getState() && l.getZipCode().equalsIgnoreCase(location.getZipCode())) {
                    result.addMessage("Duplicate Location not Allowed", ResultType.INVALID);
                }
            }
            return result;
        }

}
