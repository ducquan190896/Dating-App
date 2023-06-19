package backend2.tinder.backend2.Service;

import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import backend2.tinder.backend2.Models.Request.MessageRequest;
import backend2.tinder.backend2.Models.Response.MessageResponse;

public interface MessageService {
 List<MessageResponse> getAllByChat(Long chatId);
 List<MessageResponse> getAllByAuthserAndReceiver(Long receiverId);
 MessageResponse add(MessageRequest req);
 void deleteMessage(Long id);  
 UsernamePasswordAuthenticationToken authenticateMessageFromSocket(String username1, String token1); 
}
