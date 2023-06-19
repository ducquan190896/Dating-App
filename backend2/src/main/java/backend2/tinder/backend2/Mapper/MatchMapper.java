package backend2.tinder.backend2.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import backend2.tinder.backend2.Models.Match;
import backend2.tinder.backend2.Models.Response.MatchResponse;
import backend2.tinder.backend2.Utils.DistanceCoding;

@Component
public class MatchMapper {
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    DistanceCoding distanceCoding;

    public MatchResponse mapMatchToResponse(Match match) {
        MatchResponse res = modelMapper.map(match, MatchResponse.class);
        double distance = distanceCoding.distanceCalculator(match.getUser1().getLatitude(), match.getUser2().getLatitude(), match.getUser1().getLongitude(), match.getUser2().getLongitude());
        res.setDistance(distance);
        if(match.getChat() != null) {
            res.setChatId(match.getChat().getId());
        }
        return res;
    }
}
