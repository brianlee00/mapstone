package learn.cyburbia.data;

import learn.cyburbia.models.Developer;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DeveloperRepository {

    List<Developer> findAll();

    Developer findById(int developerId);

    Developer add(Developer developer);

    boolean update(Developer developer);

    @Transactional
    boolean deleteById(int developerId);
}
