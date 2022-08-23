package learn.cyburbia.data.mappers;

import learn.cyburbia.models.Agency;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AgencyMapper implements RowMapper<Agency> {

    @Override
    public Agency mapRow(ResultSet rs, int rowNum) throws SQLException {
        Agency agency = new Agency();
        agency.setAgencyId(rs.getInt("agency_id"));
        agency.setName(rs.getString("name"));
        agency.setEmail(rs.getString("email"));
        agency.setLocationId(rs.getInt("location_id"));
        return agency;
    }
}
