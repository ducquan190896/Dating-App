package backend2.tinder.backend2.Service.Implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import backend2.tinder.backend2.Models.Chat;
import backend2.tinder.backend2.Models.Match;
import backend2.tinder.backend2.Models.Participant;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Response.ChatResponse;
import backend2.tinder.backend2.Exception.BadResultException;
import backend2.tinder.backend2.Exception.EntityNotFoundException;
import backend2.tinder.backend2.Mapper.ChatMapper;
import backend2.tinder.backend2.Repository.ChatRepos;
import backend2.tinder.backend2.Repository.MatchRepos;
import backend2.tinder.backend2.Repository.ParticipantRepos;
import backend2.tinder.backend2.Repository.UserRepos;
import backend2.tinder.backend2.Service.ChatService;

@Service
public class ChatServiceIml implements ChatService {
    @Autowired
    ChatRepos chatRepos;
    @Autowired
    UserRepos userRepos;
    @Autowired
    ParticipantRepos participantRepos;
    @Autowired
    ChatMapper chatMapper;
    @Autowired
    MatchRepos matchRepos;


    @Override
    public List<ChatResponse> getAllByAuthUser() {
        Users authUser = getAuthUser();
        List<Chat> chats = chatRepos.findByAuthUser(authUser.getId());
        List<ChatResponse> res = chats.stream().map(chat -> chatMapper.mapChatToRes(chat)).collect(Collectors.toList());
        return res;
    }

    @Override
    public ChatResponse getByAuthUserAndReceiver(Long receiverId) {
        Users authUser = getAuthUser();
        Users receiver = getReceiver(receiverId);
        List<Chat> chats = chatRepos.findByAuthUser(authUser.getId());
        List<Chat> chatsFilter = chats.stream().filter(chat -> {
            Optional<Participant> entityParti = participantRepos.findByChatAndUser(chat, receiver);
            if(entityParti.isPresent()) {
                return true;
            } else {
                return false;
            }
        }).collect(Collectors.toList());
        System.out.println(chatsFilter.size() + " : chatfilter size");
        if(!chatsFilter.isEmpty() && chatsFilter.size() > 0) {
            Chat chat = chatsFilter.get(0);
            System.out.println(chat);
            ChatResponse res = chatMapper.mapChatToRes(chat);
            return res;
        } else {
            Chat chat = new Chat();
            Participant participant1 = new Participant(chat, authUser);
            Participant participant2 = new Participant(chat, receiver);
            chat.getParticipants().add(participant1);
            chat.getParticipants().add(participant2);
            
            authUser.getParticipants().add(participant1);
            receiver.getParticipants().add(participant2);
            chatRepos.save(chat);
            userRepos.save(authUser);
            userRepos.save(receiver);

            return chatMapper.mapChatToRes(chat);
            
        }

    }

    @Override
    public ChatResponse getChatByMatch(Long matchId) {
        Users authUser = getAuthUser();
        Optional<Match> matchEntity = matchRepos.findById(matchId);
        if(!matchEntity.isPresent()) {
            throw new EntityNotFoundException("the match not found");
        } 
        Match match = matchEntity.get();
        Users user1 = match.getUser1();
        Users user2 = match.getUser2();
        if(!authUser.equals(user2) && !authUser.equals(user1)) {
            throw new BadResultException("the auth user not in the match relation");
        }
        Optional<Chat> chatEntity = chatRepos.findByMatch(match);

        if(chatEntity.isPresent()) {
            Chat chat = chatEntity.get();
            System.out.println(chat);
            ChatResponse res = chatMapper.mapChatToRes(chat);
            return res;
        } else {
            Chat chat = new Chat();
            Participant participant1 = new Participant(chat, user1);
            Participant participant2 = new Participant(chat, user2);
            chat.getParticipants().add(participant1);
            chat.getParticipants().add(participant2);
            chat.setMatch(match);
            match.setChat(chat);
            
            user1.getParticipants().add(participant1);
            user2.getParticipants().add(participant2);
            chatRepos.save(chat);
            matchRepos.save(match);
            userRepos.save(user1);
            userRepos.save(user2);

            return chatMapper.mapChatToRes(chat);     
        }
    }


    @Override
    public ChatResponse UpdateReadStatus(Long id) {
        Optional<Chat> entity = chatRepos.findById(id);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the chat not found");
        }
        Chat chat = entity.get();
        List<Participant> participants = participantRepos.findByChat(chat);
        
        participants.stream().forEach(parti -> {
            parti.setRead(true);
            participantRepos.save(parti);
        });
        // chat.setParticipants(participants);

        chatRepos.save(chat);
        return chatMapper.mapChatToRes(chat);
       
    }

    @Override
    public ChatResponse getById(Long Id) {
        
        Optional<Chat> entity = chatRepos.findById(Id);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the chat not found");
        }
        return chatMapper.mapChatToRes(entity.get());


    }
    private Users isCheck(Optional<Users> entity) {
        if(entity.isPresent()) {
            return entity.get();
        }
        throw new EntityNotFoundException("the user not found");
    }
    private Users getAuthUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<Users> entity = userRepos.findByUsername(username);
        Users user = isCheck(entity);
        return user;
    }
    private Users getReceiver(Long receiverId) {
        
        Optional<Users> entity = userRepos.findById(receiverId);
        Users user = isCheck(entity);
        return user;
    }
    
}
