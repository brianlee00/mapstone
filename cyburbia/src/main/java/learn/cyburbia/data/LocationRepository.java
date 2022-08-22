package learn.cyburbia.data;
import learn.cyburbia.models.Location;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LocationRepository {

    List<Location> findAll();

    Location findById(int locationId);

    Location add(Location location);

    boolean update(Location location);

    @Transactional
    boolean deleteById(int locationId);

}
