package backend2.tinder.backend2.Models.Response;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import backend2.tinder.backend2.Models.Interest;
import backend2.tinder.backend2.Models.Preference;
import backend2.tinder.backend2.Models.Enums.GenderType;
import backend2.tinder.backend2.Models.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String firstname;
    private String surename;
    private GenderType gender;
    private boolean suspended;
    private String description;
    private List<String> avatarUrls;
    private List<Role> roles;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birth;
    private double longitude;
    private double latitude;
    private Preference preference;
    private List<Interest> interests;
    private String publicKey;
    
    @Override
    public String toString() {
        return "UserResponse [id=" + id + ", username=" + username + ", firstname=" + firstname + ", surename="
                + surename + ", gender=" + gender + ", suspended=" + suspended + ", description=" + description
                + ", avatarUrls=" + avatarUrls + ", roles=" + roles + ", birth=" + birth + ", longitude=" + longitude
                + ", latitude=" + latitude + "]";
    }

    public UserResponse(Long id, String username, String firstname, String surename, GenderType gender,
            boolean suspended, String description, List<String> avatarUrls, List<Role> roles, double longitude,
            double latitude, Preference preference, List<Interest> interests) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.surename = surename;
        this.gender = gender;
        this.suspended = suspended;
        this.description = description;
        this.avatarUrls = avatarUrls;
        this.roles = roles;
        this.longitude = longitude;
        this.latitude = latitude;
        this.preference = preference;
        this.interests = interests;
    }

    public UserResponse(Long id, String username, String firstname, String surename, GenderType gender,
            boolean suspended, String description, List<String> avatarUrls, List<Role> roles, LocalDate birth,
            double longitude, double latitude) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.surename = surename;
        this.gender = gender;
        this.suspended = suspended;
        this.description = description;
        this.avatarUrls = avatarUrls;
        this.roles = roles;
        this.birth = birth;
        this.longitude = longitude;
        this.latitude = latitude;
    }
     public UserResponse(Long id, String username, String firstname, String surename, GenderType gender,
            boolean suspended, String description, List<String> avatarUrls, List<Role> roles, LocalDate birth,
            double longitude, double latitude, String publicKey) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.surename = surename;
        this.gender = gender;
        this.suspended = suspended;
        this.description = description;
        this.avatarUrls = avatarUrls;
        this.roles = roles;
        this.birth = birth;
        this.longitude = longitude;
        this.latitude = latitude;
        this.publicKey = publicKey;
    }


 
}
