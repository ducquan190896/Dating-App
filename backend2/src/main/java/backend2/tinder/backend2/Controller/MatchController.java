package backend2.tinder.backend2.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend2.tinder.backend2.Mapper.MatchMapper;
import backend2.tinder.backend2.Models.Match;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Response.MatchResponse;
import backend2.tinder.backend2.Service.MatchService;
import backend2.tinder.backend2.Service.UserService;

@RestController
@RequestMapping("/api/matches")
public class MatchController {
    @Autowired
    MatchMapper matchMapper;
    @Autowired
    MatchService matchService;
    @Autowired
    UserService userService;

    @GetMapping("/match/{matchId}")
    public ResponseEntity<MatchResponse> getByMatchId(@PathVariable long matchId) {
        Match match = matchService.getByMatchId(matchId);
        MatchResponse res = matchMapper.mapMatchToResponse(match);
        return new ResponseEntity<MatchResponse>(res, HttpStatus.OK);
    }
    
    @GetMapping("/user1/{user1}/user2/{user2}")
    public ResponseEntity<MatchResponse> getByUser1AndUser2(@PathVariable long user1, @PathVariable long user2) {
        Match match = matchService.getByUser1AndUser2(user1, user2);
        MatchResponse res = matchMapper.mapMatchToResponse(match);
        return new ResponseEntity<MatchResponse>(res, HttpStatus.OK);
    }
    @GetMapping("/authUser")
    public ResponseEntity<List<MatchResponse>> getByMatchesOfAuthUser() {
        Users authUser = userService.getAuthUser();
        List<Match> matches = matchService.getMatchesByUser(authUser.getId());
        List<MatchResponse> res = matches.stream().map(match -> matchMapper.mapMatchToResponse(match)).collect(Collectors.toList());
        return new ResponseEntity<List<MatchResponse>>(res, HttpStatus.OK);
    }

    @GetMapping("/isExist/user1/{user1}/user2/{user2}")
    public ResponseEntity<Boolean> getExistByUser1AndUser2(@PathVariable long user1, @PathVariable long user2) {
        return new ResponseEntity<Boolean>(matchService.isMatchExist(user1, user2), HttpStatus.OK);
    }
    @GetMapping("/isExist/match/{matchId}")
    public ResponseEntity<Boolean> getExistByUser1AndUser2(@PathVariable long matchId) {
        return new ResponseEntity<Boolean>(matchService.isMatchExistByMatchId(matchId), HttpStatus.OK);
    }
}
