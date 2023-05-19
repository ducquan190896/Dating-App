package backend.tinder.backendtinder.Models;

import backend.tinder.backendtinder.Models.Enums.GenderType;
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

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users user;
}
