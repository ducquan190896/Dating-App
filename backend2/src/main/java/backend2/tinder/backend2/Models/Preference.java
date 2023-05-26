package backend2.tinder.backend2.Models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import backend2.tinder.backend2.Models.Enums.GenderType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

@Entity(name = "Preference")
@Table(name = "preference")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Preference {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @Min(value = 0, message = "distance must be higher than 0")
    @Column(name = "distance")
    private Long distance;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender_orientation")
    private GenderType genderOrientation;

    @Min(value = 18, message = "maxAge must be higher than 18")
    @Column(name = "max_age")
    private int maxAge;

    @Min(value = 18, message = "minAge must be higher than 18")
    private int minAge;

    // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    // @Column(name = "birth")
    // private LocalDate birth;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE})
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users user;

    public Preference( Long distance, GenderType genderOrientation,  int maxAge, int minAge) {
        this.distance = distance;
        this.genderOrientation = genderOrientation;
        this.maxAge = maxAge;
        this.minAge = minAge;
    }

    
}
