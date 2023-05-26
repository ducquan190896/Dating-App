package backend2.tinder.backend2.Models.Response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MatchResponse {
    private long id;
    private  UserResponse user1;
    private UserResponse user2;
    private boolean isBlocked;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    
}
