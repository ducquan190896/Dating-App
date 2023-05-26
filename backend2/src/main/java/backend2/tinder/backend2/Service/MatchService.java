package backend2.tinder.backend2.Service;

import java.util.List;
import java.util.Optional;

import backend2.tinder.backend2.Models.Match;
import backend2.tinder.backend2.Models.Users;

public interface MatchService {
    Match getByMatchId(long matchId);
    Match getByUser1AndUser2(long user1, Long user2);
    List<Match> getMatchesByUser(long userId);
    boolean isMatchExist(long user1, long user2);
    boolean isMatchExistByMatchId(long matchId);
    Match save(Users user1, Users user2);
}
