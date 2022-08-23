package learn.cyburbia.data.mappers;

import learn.cyburbia.models.Location;
import learn.cyburbia.models.State;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LocationMapper implements RowMapper<Location> {
    @Override
    public Location mapRow(ResultSet rs, int rowNum) throws SQLException {
        Location location = new Location();
        location.setLocationId(rs.getInt("location_id"));
        location.setAddress(rs.getString("address"));
        location.setCity(rs.getString("city"));
        location.setState(State.abbrStringToState(rs.getString("state")));
        location.setZipCode(rs.getString("zip_code"));
        return location;
    }
}
