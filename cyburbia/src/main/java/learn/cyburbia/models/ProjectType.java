package learn.cyburbia.models;

public enum ProjectType {
    RES("Residential"),
    IND("Industrial"),
    COM("Commercial"),
    AGR("Agricultural"),
    REC("Recreational"),
    INS("Institutional"),
    TRA("Transportation"),
    MIX("Mixed-Urban"),
    NAT("Natural");

    private final String name;

    ProjectType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static ProjectType findByName(String name) {
        for (ProjectType projectType : ProjectType.values()) {
            if (projectType.getName().equalsIgnoreCase(name)) {
                return projectType;
            }
        }
        String message = String.format("No project type with name: %s.", name);
        throw new RuntimeException(message);
    }

}
