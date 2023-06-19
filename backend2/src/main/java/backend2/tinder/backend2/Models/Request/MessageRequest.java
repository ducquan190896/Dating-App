package backend2.tinder.backend2.Models.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequest {
    private Long chatId;
    private String content;
    private String token;
    
    public MessageRequest(Long chatId, String content) {
        this.chatId = chatId;
        this.content = content;
    }

    
}
