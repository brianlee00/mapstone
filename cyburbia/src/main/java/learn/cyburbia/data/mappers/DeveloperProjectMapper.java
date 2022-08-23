package learn.cyburbia.data.mappers;

import learn.cyburbia.models.DeveloperProject;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DeveloperProjectMapper implements RowMapper<DeveloperProject> {

    @Override
    public DeveloperProject mapRow(ResultSet rs, int rowNum) throws SQLException {
        DeveloperProject developerProject = new DeveloperProject();
        developerProject.setDeveloperId(rs.getInt("developer_id"));

        ProjectMapper projectMapper = new ProjectMapper();
        developerProject.setProject(projectMapper.mapRow(rs, rowNum));
        return developerProject;
    }
}
