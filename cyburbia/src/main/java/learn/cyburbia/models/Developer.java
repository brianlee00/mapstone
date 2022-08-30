package learn.cyburbia.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Developer {

    private int developerId;
    private String name;
    private String email;
    private int locationId;
    private List<Project> projects = new ArrayList<>();

    public Developer() {}

    public Developer(int developerId, String name, String email, int locationId, List<Project> projects) {
        this.developerId = developerId;
        this.name = name;
        this.email = email;
        this.locationId = locationId;
        this.projects = projects;
    }

    public int getDeveloperId() {
        return developerId;
    }

    public void setDeveloperId(int developerId) {
        this.developerId = developerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Developer developer = (Developer) o;
        return developerId == developer.developerId && locationId == developer.locationId && Objects.equals(name, developer.name) && Objects.equals(email, developer.email) && Objects.equals(projects, developer.projects);
    }

    @Override
    public int hashCode() {
        return Objects.hash(developerId, name, email, locationId, projects);
    }
}
