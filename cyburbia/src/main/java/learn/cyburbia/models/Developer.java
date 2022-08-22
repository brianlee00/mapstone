package learn.cyburbia.models;

import java.util.ArrayList;
import java.util.List;

public class Developer {

    private int developerId;
    private String name;
    private String email;
    private int locationId;
    private List<DeveloperProject> projects = new ArrayList<>();

}
