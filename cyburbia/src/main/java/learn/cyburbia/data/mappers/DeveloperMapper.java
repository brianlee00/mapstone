package learn.cyburbia.data.mappers;

import learn.cyburbia.models.Developer;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DeveloperMapper implements RowMapper<Developer> {
    @Override
    public Developer mapRow(ResultSet rs, int rowNum) throws SQLException {
        Developer developer = new Developer();
        developer.setDeveloperId(rs.getInt("developer_id"));
        developer.setName(rs.getString("name"));
        developer.setEmail(rs.getString("email"));
        developer.setLocationId(rs.getInt("location_id"));
        return developer;
    }
}
