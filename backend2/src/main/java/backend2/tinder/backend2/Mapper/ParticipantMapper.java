package backend2.tinder.backend2.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import backend2.tinder.backend2.Models.Chat;
import backend2.tinder.backend2.Models.Participant;
import backend2.tinder.backend2.Models.Response.ChatResponse;
import backend2.tinder.backend2.Models.Response.ParticipantResponse;

@Component
public class ParticipantMapper {
     @Autowired
    UserMapper userMapper;
    @Autowired
    ModelMapper modelMapper;

    public ParticipantResponse mapMessageToRes(Participant participant) {
        ParticipantResponse res = modelMapper.map(participant, ParticipantResponse.class);
        return res;
    }
}
