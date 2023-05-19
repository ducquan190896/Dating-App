package backend.tinder.backendtinder.Models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import backend.tinder.backendtinder.Models.Enums.GenderType;
import backend.tinder.backendtinder.Models.Enums.Role;
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

    
    @ElementCollection(targetClass = String.class)
    @CollectionTable(name = "avatar_images", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "avatarUrl")
    private List<String> avatarUrls = new ArrayList<>();
    
    @ElementCollection(targetClass = String.class)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private List<Role> roles = new ArrayList<>();

    @NotBlank(message = "birth cannot be blank")
    @Column(name = "birth", nullable = false)
    private LocalDate birth;

   
    @Column(name = "address")
    private String address;

  
    @Column(name = "city")
    private String city;

   
    @Column(name = "country")
    private String country;

    @Column(name = "zipcode")
    private String zipcode;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "latitude")
    private String latitude;

    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Preference preference;

    @ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
    private List<Interest> interests = new ArrayList<>();

}
