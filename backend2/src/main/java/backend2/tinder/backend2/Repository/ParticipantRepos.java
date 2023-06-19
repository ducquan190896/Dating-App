package backend2.tinder.backend2.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend2.tinder.backend2.Models.Chat;
import backend2.tinder.backend2.Models.Participant;
import backend2.tinder.backend2.Models.Users;

@Repository
public interface ParticipantRepos extends JpaRepository<Participant, Long> {
    List<Participant> findByChat(Chat chat);
    Optional<Participant> findByChatAndUser(Chat chat, Users user);
}
