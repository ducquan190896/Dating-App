package backend2.tinder.backend2.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend2.tinder.backend2.Models.Interest;
import backend2.tinder.backend2.Models.Users;

@Repository
public interface InterestRepos  extends JpaRepository<Interest, Long>{
    List<Interest> findByUsers(Users user);
    Optional<Interest> findByName(String name);
}
