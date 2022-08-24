package learn.cyburbia.data;

import learn.cyburbia.models.Location;
import learn.cyburbia.data.mappers.LocationMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;


@Repository
public class LocationJdbcTemplateRepository implements LocationRepository {

    private final JdbcTemplate jdbcTemplate;

    public LocationJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Location> findAll() {
        final String sql = "select location_id, address, city, state, zip_code "
                + "from location limit 1000;";
        return jdbcTemplate.query(sql, new LocationMapper());
    }

    @Override
    @Transactional
    public Location findById(int locationId) {

        final String sql = "select location_id, address, city, state, zip_code "
                + "from location "
                + "where location_id = ?;";

        Location location = jdbcTemplate.query(sql, new LocationMapper(), locationId).stream()
                .findFirst().orElse(null);

        return location;
    }

    @Override
    public Location add(Location location) {

        final String sql = "insert into location (address, city, state, zip_code) "
                + " values (?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, location.getAddress());
            ps.setString(2, location.getCity());
            ps.setString(3, location.getState().getAbbr());
            ps.setString(4, location.getZipCode());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        location.setLocationId(keyHolder.getKey().intValue());
        return location;
    }

    @Override
    public boolean update(Location location) {

        final String sql = "update location set "
                + "address = ?, "
                + "city = ?, "
                + "state = ?, "
                + "zip_code = ? "
                + "where location_id = ?;";

        return jdbcTemplate.update(sql,
                location.getAddress(),
                location.getCity(),
                location.getState().getAbbr(),
                location.getZipCode(),
                location.getLocationId()) > 0;
    }




}
