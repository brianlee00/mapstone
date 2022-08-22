package learn.cyburbia.models;

public class Location {

    private int locationId;
    private String address;
    private String city;
    private State state;

    public Location() {}

    public Location(String address, String city, State state) {
        this.address = address;
        this.city = city;
        this.state = state;
    }

    public int getLocationId() {return locationId;}
    public void setLocationId(int locationId) {this.locationId = locationId;}

    public String getAddress() {return address;}
    public void setAddress(String address){this.address = address;}

    public String getCity() {return city;}
    public void setCity() {this.city = city;}

    public State getState() {return state;}
    public void setState(State state) {this.state = state;}

    public String getLocation() {return address + ", "+ city +", "+ state.getAbbr();}

}
