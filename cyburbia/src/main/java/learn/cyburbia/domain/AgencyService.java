package learn.cyburbia.domain;

import learn.cyburbia.data.AgencyRepository;
import learn.cyburbia.models.Agency;

import java.util.List;

public class AgencyService {
    private final AgencyRepository agencyRepository;

    public AgencyService(AgencyRepository agencyRepository) {
        this.agencyRepository = agencyRepository;
    }

    public List<Agency> findAll() { return agencyRepository.findAll(); }

    public Agency findById(int agencyId) { return agencyRepository.findById(agencyId); }

    public Result<Agency> add(Agency agency) {
        Result<Agency> result = validate(agency);
        if (!result.isSuccess()) {
            return result;
        }

        if (agency.getAgencyId() != 0) {
            result.addMessage("Agency ID cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        agency = agencyRepository.add(agency);
        result.setPayload(agency);
        return result;
    }

    public Result<Agency> update(Agency agency) {
        Result<Agency> result = validate(agency);
        if (!result.isSuccess()) {
            return result;
        }

        if (agency.getAgencyId() <= 0) {
            result.addMessage("Agency ID must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!agencyRepository.update(agency)) {
            String msg = String.format("Agency ID: %s, not found", agency.getAgencyId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    private Result<Agency> validate(Agency agency) {
        Result<Agency> result = new Result<>();

        if (agency == null) {
            result.addMessage("Agency cannot be null", ResultType.INVALID);
            return result;
        }
        if (Validations.isNullOrBlank(agency.getName())) {
            result.addMessage("Name is required for this Agency", ResultType.INVALID);
        }
        if (Validations.isNullOrBlank(agency.getEmail())) {
            result.addMessage("Email address is required for this Agency", ResultType.INVALID);
        }
        if (agency.getLocationId() == Integer.parseInt(null)) {
            result.addMessage("Location must be set for this Agency", ResultType.INVALID);
        }

        if (!agency.getEmail().contains("@")) {
            result.addMessage("Must provide valid email address", ResultType.INVALID);
        }

        return result;
    }

}
