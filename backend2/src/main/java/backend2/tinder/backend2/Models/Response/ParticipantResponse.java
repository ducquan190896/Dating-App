package backend2.tinder.backend2.Models.Response;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantResponse {
    private Long id;
    private Long chatId;
    private UserResponse user;
    private boolean isRead;
    
}
