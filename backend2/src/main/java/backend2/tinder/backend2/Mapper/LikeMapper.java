package backend2.tinder.backend2.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import backend2.tinder.backend2.Models.Like;
import backend2.tinder.backend2.Models.Response.LikeResponse;
import backend2.tinder.backend2.Utils.DistanceCoding;

@Component
public class LikeMapper {
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    DistanceCoding distanceCoding;
    
    public LikeResponse mapLikeToResponse(Like like) {
        LikeResponse res = modelMapper.map(like, LikeResponse.class);
        double distance = distanceCoding.distanceCalculator(like.getLikedUser().getLatitude(), like.getLikingUser().getLatitude(), like.getLikedUser().getLongitude(), like.getLikingUser().getLongitude());
        res.setDistance(distance);
        return res;
    }
}
