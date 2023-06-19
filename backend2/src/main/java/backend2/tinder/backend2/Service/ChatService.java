package backend2.tinder.backend2.Service;

import java.util.List;

import backend2.tinder.backend2.Models.Response.ChatResponse;

public interface ChatService {
    List<ChatResponse> getAllByAuthUser();
    ChatResponse getByAuthUserAndReceiver(Long receiverId);
    ChatResponse getChatByMatch(Long matchId);
    ChatResponse getById(Long Id);
    ChatResponse UpdateReadStatus(Long id);
}
