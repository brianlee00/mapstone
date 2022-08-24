package learn.cyburbia.data;

import learn.cyburbia.models.ProjectDeveloper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ProjectDeveloperJdbcTemplateRepository implements ProjectDeveloperRepository{

    private final JdbcTemplate jdbcTemplate;

    public ProjectDeveloperJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(ProjectDeveloper projectDeveloper) {
        final String sql = "insert into project_developer (developer_id, project_id) " +
                "values (?,?);";
        return jdbcTemplate.update(sql,
                projectDeveloper.getDeveloper().getDeveloperId(),
                projectDeveloper.getProjectId()) > 0;
    }

//    @Override
//    public boolean update(ProjectDeveloper projectDeveloper) {
//        final String sql = "update project_developer set " +
//                "developer_id = ?, " +
//                "project_id = ? " +
//                "where developer_id = ? and project_id = ?;";
//        return jdbcTemplate.update(sql,
//                projectDeveloper.getDeveloper().getDeveloperId(),
//                projectDeveloper.getProjectId(),
//                projectDeveloper.getDeveloper().getDeveloperId(),
//                projectDeveloper.getProjectId()) > 0;
//    }

    @Override
    public boolean deleteByKey(int projectId, int developerId) {
        final String sql = "delete from project_developer " +
                "where project_id = ? and developer_id = ?;";
        return jdbcTemplate.update(sql, projectId, developerId) > 0;
    }
}
