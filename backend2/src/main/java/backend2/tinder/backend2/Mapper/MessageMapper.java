package backend2.tinder.backend2.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import backend2.tinder.backend2.Models.Message;
import backend2.tinder.backend2.Models.Response.MessageResponse;

@Component
public class MessageMapper {
    @Autowired
    UserMapper userMapper;
    @Autowired
    ModelMapper modelMapper;

    public MessageResponse mapMessageToResponse(Message message) {
        MessageResponse res = modelMapper.map(message, MessageResponse.class);
        return res;
    }
}
