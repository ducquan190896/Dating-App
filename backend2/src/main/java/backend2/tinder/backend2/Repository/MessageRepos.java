package backend2.tinder.backend2.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend2.tinder.backend2.Models.Chat;
import backend2.tinder.backend2.Models.Message;
import backend2.tinder.backend2.Models.Response.MessageResponse;

@Repository
public interface MessageRepos extends JpaRepository<Message, Long>{
    List<Message> findByChat(Chat chat);
}
