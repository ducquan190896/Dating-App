package backend2.tinder.backend2.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend2.tinder.backend2.Models.Block;
import backend2.tinder.backend2.Models.Users;

@Repository
public interface BlockRepos extends JpaRepository<Block, Long> {
    Optional<Block> findByBlockedUserAndBlockingUser(Users blockedUser, Users blockingUser);
    List<Block> findByBlockedUser(Users blockedUser);
}
