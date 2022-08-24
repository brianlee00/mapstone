package learn.cyburbia.data;

import learn.cyburbia.models.Agency;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AgencyRepository {
    List<Agency> findAll();

    Agency findById(int agencyId);

    Agency add(Agency agency);

    boolean update(Agency agency);


}
