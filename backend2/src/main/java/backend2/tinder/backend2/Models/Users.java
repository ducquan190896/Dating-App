package backend2.tinder.backend2.Models;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import backend2.tinder.backend2.Models.Enums.GenderType;
import backend2.tinder.backend2.Models.Enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Users")
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @NotBlank(message = "username cannot be blank")
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @NotBlank(message = "password cannot be blank")
    @Column(name = "password", nullable = false)
    private String password;

    @NotBlank(message = "firstname cannot be blank")
    @Column(name = "firstname", nullable = false)
    private String firstname;

    @NotBlank(message = "surename cannot be blank")
    @Column(name = "surename", nullable = false)
    private String surename;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private GenderType gender;

    @Column(name = "suspended")
    private boolean suspended;

    @NotBlank(message = "description cannot be blank")
    @Column(name = "description", nullable = false)
    private String description;

    
    @ElementCollection(targetClass = String.class, fetch =  FetchType.EAGER)
    @CollectionTable(name = "avatar_images", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "avatarUrl")
    private List<String> avatarUrls = new ArrayList<>();

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "roles")
    private List<Role> roles = new ArrayList<>();

    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "birth")
    private LocalDate birth;

   
    // @Column(name = "address")
    // private String address;

  
    // @Column(name = "city")
    // private String city;

   
    // @Column(name = "country")
    // private String country;

    // @Column(name = "zipcode")
    // private String zipcode;

    @Column(name = "longitude")
    private double longitude;

    @Column(name = "latitude")
    private double latitude;

   
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Preference preference;

    @ManyToMany(mappedBy = "users", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Interest> interests = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade =  CascadeType.ALL, fetch =  FetchType.LAZY)
    private List<Participant> participants = new ArrayList<>();

    public boolean getSuspended() {
        return this.suspended;
    }
    public Preference getPreference() {
        return this.preference;
    }

    public List<Interest> getInterest() {
        return this.interests;
    }
    public Users( String username, String password, String firstname, String surename, GenderType gender, String description, List<String> avatarUrls, LocalDate birth, double latitude, double longitude) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.surename = surename;
        this.gender = gender;
        this.description = description;
        this.avatarUrls = avatarUrls;
        this.birth = birth;
        this.longitude = longitude;
        this.latitude = latitude;
        this.suspended = false;
    }
    public Users( String username, String password, String firstname, String surename, GenderType gender, String description,  LocalDate birth, double latitude, double longitude) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.surename = surename;
        this.gender = gender;
        this.description = description;
        this.birth = birth;
        this.longitude = longitude;
        this.latitude = latitude;
        this.suspended = false;
    }

    public Users( String username, String password, String firstname, String surename, GenderType gender, String description, LocalDate birth) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.surename = surename;
        this.gender = gender;
        this.description = description;
        this.birth = birth;
       
        this.suspended = false;
    }
    @Override
    public String toString() {
        return "Users [id=" + id + ", username=" + username + ", password=" + password + ", firstname=" + firstname
                + ", surename=" + surename + ", gender=" + gender + ", suspended=" + suspended + ", description="
                + description + ", avatarUrls=" + avatarUrls + ", roles=" + roles + ", birth=" + birth + ", longitude="
                + longitude + ", latitude=" + latitude + "]";
    }

    
}

