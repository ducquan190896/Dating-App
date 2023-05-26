package backend2.tinder.backend2.Models.Request;

import java.time.LocalDate;
import java.util.List;

import backend2.tinder.backend2.Models.Enums.GenderType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSignUp {
    private String username;
    private String password;
    private String firstname;
    private String surename;
    private GenderType gender;
    private String description;
    private List<String> avatarUrls;
    private LocalDate birth;
    private double longitude;
    private double latitude;
    public UserSignUp(String username, String password, String firstname, String surename, GenderType gender,
            String description, LocalDate birth, double longitude, double latitude) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.surename = surename;
        this.gender = gender;
        this.description = description;
        this.birth = birth;
        this.longitude = longitude;
        this.latitude = latitude;
    }
    
}
