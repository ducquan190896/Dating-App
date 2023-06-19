package backend2.tinder.backend2.Models.Response;

import java.time.LocalDate;

import backend2.tinder.backend2.Models.Enums.GenderType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PreferenceResponse {
    private long id;
    private long distance;
    private GenderType genderOrientation;
    private int maxAge;
    private int minAge;
    private long userId;

}
