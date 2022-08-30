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
    private int developerId;

    public Project(int projectId, int sqFt, ProjectType projectType, Status status, String description, BigDecimal budget, int locationId, int agencyId, int developerId) {
        this.projectId = projectId;
        this.sqFt = sqFt;
        this.projectType = projectType;
        this.status = status;
        this.description = description;
        this.budget = budget;
        this.locationId = locationId;
        this.agencyId = agencyId;
        this.developerId = developerId;
    }

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

    public int getDeveloperId() {
        return developerId;
    }

    public void setDeveloperId(int developerId) {
        this.developerId = developerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return projectId == project.projectId && sqFt == project.sqFt && locationId == project.locationId && agencyId == project.agencyId && developerId == project.developerId && projectType == project.projectType && status == project.status && Objects.equals(description, project.description) && Objects.equals(budget, project.budget);
    }

    @Override
    public int hashCode() {
        return Objects.hash(projectId, sqFt, projectType, status, description, budget, locationId, agencyId, developerId);
    }
}
