package learn.cyburbia.data.mappers;

import learn.cyburbia.models.ProjectDeveloper;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProjectDeveloperMapper implements RowMapper<ProjectDeveloper> {
    @Override
    public ProjectDeveloper mapRow(ResultSet rs, int rowNum) throws SQLException {
        ProjectDeveloper projectDeveloper = new ProjectDeveloper();
        projectDeveloper.setProjectId(rs.getInt("project_id"));

        DeveloperMapper developerMapper = new DeveloperMapper();
        projectDeveloper.setDeveloper(developerMapper.mapRow(rs, rowNum));
        return projectDeveloper;
    }
}
