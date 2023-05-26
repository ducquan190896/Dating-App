package backend2.tinder.backend2.Models.Response;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import backend2.tinder.backend2.Models.Interest;
import backend2.tinder.backend2.Models.Preference;
import backend2.tinder.backend2.Models.Enums.GenderType;
import backend2.tinder.backend2.Models.Enums.Role;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class View {
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
    private List<Interest> interests;
    private double matchingRate;
    private double distance;
    
    @Override
    public String toString() {
        return "View [id=" + id + ", username=" + username + ", firstname=" + firstname + ", surename=" + surename
                + ", gender=" + gender + ", suspended=" + suspended + ", description=" + description + ", avatarUrls="
                + avatarUrls + ", roles=" + roles + ", birth=" + birth + ", interests=" + interests + ", matchingRate="
                + matchingRate + ", distance=" + distance + "]";
    }

    
}
