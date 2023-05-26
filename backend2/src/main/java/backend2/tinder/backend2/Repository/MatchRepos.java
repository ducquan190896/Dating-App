package backend2.tinder.backend2.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend2.tinder.backend2.Models.Match;
import backend2.tinder.backend2.Models.Users;

@Repository
public interface MatchRepos extends JpaRepository<Match, Long> {
    @Query(value = "select m from Match m LEFT JOIN m.user1 user1 LEFT JOIN m.user2 user2 where (user1.id = :user1 AND user2.id = :user2) OR (user1.id = :user2 AND user2.id = : user1)")
    Optional<Match> findByUser1AndUser2(long user1, long user2);
    @Query(value = "select m from Match m LEFT JOIN m.user1 user1 LEFT JOIN m.user2 user2 where user1.id = :user OR user2.id = :user")
    List<Match> findbyCurrentUser(long user);

    // List<Match> findbyUser1OrUser2(Users user1, Users user2);
}
