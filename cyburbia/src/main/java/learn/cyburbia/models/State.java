package learn.cyburbia.models;

public enum State {

        ALABAMA("AL","Alabama"),
        ALASKA("AK","Alaska"),
        ARIZONA("AZ","Arizona"),
        ARKANSAS("AR","Arkansas"),
        CALIFORNIA("CA","California"),
        COLORADO("CO","Colorado"),
        CONNECTICUT("CT","Connecticut"),
        DELAWARE("DE","Delaware"),
        FLORIDA("FL","Florida"),
        GEORGIA("GA","Georgia"),
        HAWAII("HI","Hawaii"),
        IDAHO("ID","Idaho"),
        ILLINOIS("IL","Illinois"),
        INDIANA("IN","Indiana"),
        IOWA("IA","Iowa"),
        KANSAS("KS","Kansas"),
        KENTUCKY("KY","Kentucky"),
        LOUISIANA("LA","Louisiana"),
        MAINE("ME","Maine"),
        MARYLAND("MD","Maryland"),
        MASSACHUSETTS("MA","Massachusetts"),
        MICHIGAN("MI","Michigan"),
        MINNESOTA("MN","Minnesota"),
        MISSISSIPPI("MS","Mississippi"),
        MISSOURI("MO","Missouri"),
        MONTANA("MT","Montana"),
        NEBRASKA("NE","Nebraska"),
        NEVADA("NV","Nevada"),
        NEW_HAMPSHIRE("NH","New Hampshire"),
        NEW_JERSEY("NJ","New Jersey"),
        NEW_MEXICO("NM","New Mexico"),
        NEW_YORK("NY","New York"),
        NORTH_CAROLINA("NC","North Carolina"),
        NORTH_DAKOTA("ND","North Dakota"),
        OHIO("OH","Ohio"),
        OKLAHOMA("OK","Oklahoma"),
        OREGON("OR","Oregon"),
        PENNSYLVANIA("PA","Pennsylvania"),
        RHODE_ISLAND("RI","Rhode Island"),
        SOUTH_CAROLINA("SC","South Carolina"),
        SOUTH_DAKOTA("SD","South Dakota"),
        TENNESSEE("TN","Tennessee"),
        TEXAS("TX","Texas"),
        UTAH("UT","Utah"),
        VERMONT("VT","Vermont"),
        VIRGINIA("VA","Virginia"),
        WASHINGTON("WA","Washington"),
        WEST_VIRGINIA("WV","West Virginia"),
        WISCONSIN("WI","Wisconsin"),
        WYOMING("WY","Wyoming"),
        INVALID("INV","Invalid State Entry");

        private final String abbr;
        private final String fullState;

        private State(String abbr, String fullState) {
            this.abbr = abbr;
            this.fullState = fullState;

        }
        public static State fullStringToState(String state) {
            for (State s : State.values()) {
                if (s.getFullState().equalsIgnoreCase(state)) {
                    return s;
                }
            }
            return INVALID;
        }

    public static String fullStateToString(State state) {
        for (State s : State.values()) {
            if (s == state) {
                return s.getFullState();
            }
        }
        return INVALID.getFullState();
    }

        public static State abbrStringToState(String state) {
            for (State s : State.values()) {
                if (s.getAbbr().equalsIgnoreCase(state)) {
                    return s;
                }
            }
            return INVALID;
        }
    public static String abbrStateToString(State state) {
        for (State s : State.values()) {
            if (s == state) {
                return s.getAbbr();
            }
        }
        return INVALID.getFullState();
    }
        public String getAbbr() { return abbr;}
        public String getFullState(){ return fullState;}



}
