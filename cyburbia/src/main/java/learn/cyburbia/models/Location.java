package learn.cyburbia.models;

import java.util.Objects;

public class Location {

    private int locationId;
    private String address;
    private String city;
    private State state;
    private String zipCode;

    public Location() {}

    public Location(String address, String city, State state, String zipCode) {
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public int getLocationId() {return locationId;}
    public void setLocationId(int locationId) {this.locationId = locationId;}

    public String getAddress() {return address;}
    public void setAddress(String address){this.address = address;}

    public String getCity() {return city;}
    public void setCity(String city) {this.city = city;}

    public State getState() {return state;}
    public void setState(State state) {this.state = state;}

    public String getZipCode(){return zipCode;}

    public void setZipCode(String zipCode) {this.zipCode = zipCode;}

    public String getLocation() {return address + ", "+ city +", "+ state.getAbbr()+ ", "+ zipCode;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Location location = (Location) o;
        return locationId == location.locationId && Objects.equals(zipCode, location.zipCode) && Objects.equals(address, location.address) && Objects.equals(city, location.city) && state == location.state;
    }

    @Override
    public int hashCode() {
        return Objects.hash(locationId, address, city, state, zipCode);
    }
}
