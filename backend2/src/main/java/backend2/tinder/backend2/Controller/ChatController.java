package backend2.tinder.backend2.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend2.tinder.backend2.Models.Response.ChatResponse;
import backend2.tinder.backend2.Service.ChatService;

@CrossOrigin
@RestController
@RequestMapping("/api/chats")
public class ChatController {
    @Autowired
    ChatService chatService;

    @GetMapping("/authUser")
    public ResponseEntity<List<ChatResponse>> getAllChats() {
        return new ResponseEntity<List<ChatResponse>>(chatService.getAllByAuthUser(), HttpStatus.OK);
    }

    @GetMapping("/authUser/receiver/{receiverId}")
    public ResponseEntity<ChatResponse> getchatByAuthUserAndReceiver(@PathVariable Long receiverId) {
        return new ResponseEntity<ChatResponse>(chatService.getByAuthUserAndReceiver(receiverId), HttpStatus.OK);
    }
    @GetMapping("/authUser/match/{matchId}")
    public ResponseEntity<ChatResponse> getChatByMatch(@PathVariable Long matchId) {
        return new ResponseEntity<ChatResponse>(chatService.getChatByMatch(matchId), HttpStatus.OK);
    }
    @GetMapping("/chat/{id}")
    public ResponseEntity<ChatResponse> getChatById(@PathVariable Long id) {
        return new ResponseEntity<ChatResponse>(chatService.getById(id), HttpStatus.OK);
    }
    @PutMapping("/chat/{id}/readStatus")
    public ResponseEntity<ChatResponse> updateReadStatus(@PathVariable Long id) {
        return new ResponseEntity<ChatResponse>(chatService.UpdateReadStatus(id), HttpStatus.OK);
    }
}
