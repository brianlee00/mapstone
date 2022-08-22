package learn.cyburbia.models;

public enum Status {

    PRO("Proposed"),
    REV("In Review"),
    APP("Approved"),
    CON("Under Construction"),
    COM("Completed");

    private final String name;

    Status(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static Status findByName(String name) {
        for (Status status : Status.values()) {
            if (status.getName().equalsIgnoreCase(name)) {
                return status;
            }
        }
        String message = String.format("No status with name: %s.", name);
        throw new RuntimeException(message);
    }

}
