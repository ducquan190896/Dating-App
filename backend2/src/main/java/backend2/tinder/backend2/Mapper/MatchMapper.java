package backend2.tinder.backend2.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import backend2.tinder.backend2.Models.Match;
import backend2.tinder.backend2.Models.Response.MatchResponse;

@Component
public class MatchMapper {
    @Autowired
    ModelMapper modelMapper;

    public MatchResponse mapMatchToResponse(Match match) {
        MatchResponse res = modelMapper.map(match, MatchResponse.class);
        return res;
    }
}
