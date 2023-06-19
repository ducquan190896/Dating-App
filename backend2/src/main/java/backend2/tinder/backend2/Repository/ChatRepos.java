package backend2.tinder.backend2.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend2.tinder.backend2.Models.Chat;
import backend2.tinder.backend2.Models.Match;

@Repository
public interface ChatRepos extends JpaRepository<Chat, Long> {
    @Query(value = "select chat from Chat chat LEFT JOIN chat.participants p where p.user.id = :userId ORDER BY chat.dateCreated DESC")
    List<Chat> findByAuthUser(Long userId);
    Optional<Chat> findByMatch(Match match);
}
