package backend2.tinder.backend2.Service.Implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend2.tinder.backend2.Exception.EntityExistingException;
import backend2.tinder.backend2.Exception.EntityNotFoundException;
import backend2.tinder.backend2.Models.Match;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Repository.MatchRepos;
import backend2.tinder.backend2.Service.MatchService;
import backend2.tinder.backend2.Service.UserService;

@Service
public class MatchServiceIml implements MatchService{
    @Autowired
    MatchRepos matchRepos;
    @Autowired
    UserService userService;
    @Override
    public Match getByMatchId(long matchId) {
        Optional<Match> entity = matchRepos.findById(matchId);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the match not found");
        }
        Match match = entity.get();
        return match;
    }
    @Override
    public Match getByUser1AndUser2(long user1, Long user2) {
        Optional<Match> entity = matchRepos.findByUser1AndUser2(user1, user2);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the match not found");
        }
        Match match = entity.get();
        return match;
    }
    @Override
    public List<Match> getMatchesByUser(long userId) {
        List<Match> list = matchRepos.findbyCurrentUser(userId);
        list = list.stream().filter(match -> match.getIsBlock() == false).collect(Collectors.toList());
        return list;
    }
    @Override
    public boolean isMatchExist(long user1, long user2) {
        Optional<Match> entity = matchRepos.findByUser1AndUser2(user1, user2);
        if(!entity.isPresent()) {
           return false;
        }
        return true;
    }
    @Override
    public boolean isMatchExistByMatchId(long matchId) {
        Optional<Match> entity = matchRepos.findById(matchId);
        if(!entity.isPresent()) {
            return false;
        }
        return true;
    }
    @Override
    public Match save(Users user1, Users user2) {
        
        boolean isExist = isMatchExist(user1.getId(), user2.getId());
        if(isExist == true) {
            throw new EntityExistingException("the match exists");
        }
        Match match = new Match(user1, user2);
        return matchRepos.save(match);
    }

    
}
