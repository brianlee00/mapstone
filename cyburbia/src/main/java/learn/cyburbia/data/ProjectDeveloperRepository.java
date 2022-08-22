package learn.cyburbia.data;

import learn.cyburbia.models.ProjectDeveloper;

public interface ProjectDeveloperRepository {
    boolean add(ProjectDeveloper projectDeveloper);

    boolean update(ProjectDeveloper projectDeveloper);

    boolean deleteByKey(int projectId, int developerId);
}
