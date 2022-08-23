package learn.cyburbia.data;

import learn.cyburbia.models.Project;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ProjectJdbcTemplateRepository implements ProjectRepository{

    private final JdbcTemplate jdbcTemplate;

    public ProjectJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public List<Project> findAll() {
        final String sql = "select project_id, location_id, agency_id, sq_ft, `type`, `status`, " +
                "`description`, budget " +
                "from project;";
        return jdbcTemplate.query(sql, new ProjectMapper());
    }

    @Override
    public Project findById(int projectId) {
        final String sql = "select project_id, location_id, agency_id, sq_ft, `type`, `status`, " +
                "`description`, budget " +
                "from project" +
                "where project_id = ?;";
        Project project = jdbcTemplate.query(sql, new ProjectMapper(), projectId).stream
                .findFirst().orElse(null);

        if (project != null) {
// ************************************************************
        }
        return project;
    }

    @Override
    public Project add(Project project) {
        final String sql = "insert into project (location_id, agency_id, sq_ft, `type`, `status`, " +
                "`description`, budget) " +
                "values (?,?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, project.getLocationId());
            ps.setInt(2, project.getAgencyId());
            ps.setInt(3, project.getSqFt());
            ps.setString(4, project.getProjectType().toString());
            ps.setString(5, project.getStatus().toString());
            ps.setString(6, project.getDescription());
            ps.setInt(7, project.getBudget().intValue());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        project.setProjectId(keyHolder.getKey().intValue());
        return project;
    }

    @Override
    public boolean update(Project project) {
        final String sql = "update project set "
                + "location_id = ?, "
                + "agency_id = ?, "
                + "last_name = ?, "
                + "dob = ?, "
                + "height_in_inches = ? "
                + "where agent_id = ?;";

        return jdbcTemplate.update(sql,
                agent.getFirstName(),
                agent.getMiddleName(),
                agent.getLastName(),
                agent.getDob(),
                agent.getHeightInInches(),
                agent.getAgentId()) > 0;
    }

    @Override
    public boolean deleteById(int projectId) {
        return false;
    }
}
