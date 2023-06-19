package backend2.tinder.backend2.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import backend2.tinder.backend2.Models.Chat;
import backend2.tinder.backend2.Models.Message;
import backend2.tinder.backend2.Models.Response.ChatResponse;
import backend2.tinder.backend2.Models.Response.MessageResponse;

@Component
public class ChatMapper {
    @Autowired
    UserMapper userMapper;
    @Autowired
    ModelMapper modelMapper;

    public ChatResponse mapChatToRes(Chat chat) {
        ChatResponse res = modelMapper.map(chat, ChatResponse.class);
        res.setMatchId(chat.getMatch().getId());
        return res;
    }
}
