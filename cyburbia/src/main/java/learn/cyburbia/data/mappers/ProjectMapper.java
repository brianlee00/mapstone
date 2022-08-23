package learn.cyburbia.data.mappers;

import learn.cyburbia.models.Project;
import learn.cyburbia.models.ProjectType;
import learn.cyburbia.models.Status;
import org.springframework.jdbc.core.RowMapper;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ProjectMapper implements RowMapper<Project> {
    @Override
    public Project mapRow(ResultSet rs, int rowNum) throws SQLException {
        Project project = new Project();
        project.setProjectId(rs.getInt("project_id"));
        project.setLocationId(rs.getInt("location_id"));
        project.setAgencyId(rs.getInt("agency_id"));
        project.setSqFt(rs.getInt("sq_ft"));
        project.setProjectType(ProjectType.valueOf(rs.getString("type")));
        project.setStatus(Status.valueOf(rs.getString("status")));
        project.setDescription(rs.getString("description"));
        project.setBudget(BigDecimal.valueOf(rs.getDouble("budget")));
        return project;
    }
}
