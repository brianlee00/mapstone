package learn.cyburbia.models;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Project {

    private int projectId;
    private int sqFt;
    private ProjectType projectType;
    private Status status;
    private String description;
    private BigDecimal budget;
    private int locationId;
    private int agencyId;
    private List<ProjectDeveloper> developers = new ArrayList<>();

    public Project(int projectId, int sqFt, ProjectType projectType, Status status, String description, BigDecimal budget, int locationId, int agencyId, List<ProjectDeveloper> developers) {
        this.projectId = projectId;
        this.sqFt = sqFt;
        this.projectType = projectType;
        this.status = status;
        this.description = description;
        this.budget = budget;
        this.locationId = locationId;
        this.agencyId = agencyId;
        this.developers = developers;
    }

    public Project() {}

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public int getSqFt() {
        return sqFt;
    }

    public void setSqFt(int sqFt) {
        this.sqFt = sqFt;
    }

    public ProjectType getProjectType() {
        return projectType;
    }

    public void setProjectType(ProjectType projectType) {
        this.projectType = projectType;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getBudget() {
        return budget;
    }

    public void setBudget(BigDecimal budget) {
        this.budget = budget;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public int getAgencyId() {
        return agencyId;
    }

    public void setAgencyId(int agencyId) {
        this.agencyId = agencyId;
    }

    public List<ProjectDeveloper> getDevelopers() {
        return developers;
    }

    public void setDevelopers(List<ProjectDeveloper> developers) {
        this.developers = developers;
    }

}
