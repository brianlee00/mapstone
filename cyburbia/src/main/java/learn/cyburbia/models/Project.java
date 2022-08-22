package learn.cyburbia.models;

import java.util.ArrayList;
import java.util.List;

public class Project {

    private int id;
    private int sqFt;
    private String type;
    private String status;
    private String description;
    private double budget;
    private int locationId;
    private int agencyId;
    private List<ProjectDeveloper> developers = new ArrayList<>();

}
