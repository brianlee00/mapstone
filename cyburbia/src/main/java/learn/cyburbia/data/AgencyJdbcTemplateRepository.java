package learn.cyburbia.data;

import learn.cyburbia.data.mappers.ProjectMapper;
import learn.cyburbia.models.Agency;
import learn.cyburbia.data.mappers.AgencyMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AgencyJdbcTemplateRepository implements AgencyRepository{

    private final JdbcTemplate jdbcTemplate;

    public AgencyJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Agency> findAll() {
        final String sql = "select agency_id, name, email, location_id from agency limit 1000;";
        return jdbcTemplate.query(sql, new AgencyMapper());
    }

    @Override
    @Transactional
    public Agency findById(int agencyId) {

        final String sql = "select agency_id, name, email, location_id "
                + "from agency "
                + "where agency_id = ?;";

        Agency agency = jdbcTemplate.query(sql, new AgencyMapper(), agencyId).stream()
                .findAny().orElse(null);

        if (agency != null) {
            addProjects(agency);
        }

        return agency;
    }

    @Override
    public Agency add(Agency agency) {

        final String sql = "insert into agency (name, email, location_id) values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, agency.getName());
            ps.setString(2, agency.getEmail());
            ps.setInt(3, agency.getLocationId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        agency.setAgencyId(keyHolder.getKey().intValue());
        return agency;
    }

    @Override
    public boolean update(Agency agency) {

        final String sql = "update agency set "
                + "name = ?, "
                + "email = ?, "
                + "location_id = ? "
                + "where agency_id = ?";

        return jdbcTemplate.update(sql, agency.getName(), agency.getEmail(), agency.getLocationId(), agency.getAgencyId()) > 0;
    }

    private void addProjects(Agency agency){
        final String sql = "select project.project_id, project.location_id, project.agency_id, project.developer_id, project.sq_ft, project.type, project.status, project.description, project.budget "
                +"from project "
                +"inner join agency on agency.agency_id = project.agency_id "
                +"where project.agency_id = ?;";
        var projects = jdbcTemplate.query(sql, new ProjectMapper(), agency.getAgencyId());
        agency.setProjects(projects);
    }






}
