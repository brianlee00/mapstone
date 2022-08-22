package learn.cyburbia.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Agency {
    private int agencyId;
    private String name;
    private int locationId;
    private String email;
    private List<Project> projects = new ArrayList<>();

    public Agency(){}
    public Agency(String name, String email, int locationId){
        this.name = name;
        this.email = email;
        this.locationId = locationId;
    }

    public int getAgencyId() {return agencyId;}
    public void setAgencyId(int agencyId){this.agencyId = agencyId;}

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public int getLocationId() {return locationId;}
    public void setLocationId(int locationId){this.locationId = locationId;}

    public String getEmail() {return email;}
    public void setEmail(String email){this.email = email;}

    public List<Project> getProjects() {return new ArrayList<>(projects);}
    public void setProjects(List<Project> projects){this.projects = projects;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Agency agency = (Agency) o;
        return agencyId == agency.agencyId && locationId == agency.locationId && Objects.equals(name, agency.name) && Objects.equals(email, agency.email) && Objects.equals(projects, agency.projects);
    }

    @Override
    public int hashCode() {
        return Objects.hash(agencyId, name, locationId, email, projects);
    }


}
