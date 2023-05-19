package backend.tinder.backendtinder.Models.Enums;

public enum GenderType {
    MALE("MALE"),
    FEMALE("FEMALE"),
    OTHERS("OTHERS");

    private String name;

    GenderType(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
