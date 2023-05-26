package backend2.tinder.backend2.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import backend2.tinder.backend2.Models.Like;
import backend2.tinder.backend2.Models.Response.LikeResponse;

@Component
public class LikeMapper {
    @Autowired
    ModelMapper modelMapper;
    
    public LikeResponse mapLikeToResponse(Like like) {
        LikeResponse res = modelMapper.map(like, LikeResponse.class);
        return res;
    }
}
