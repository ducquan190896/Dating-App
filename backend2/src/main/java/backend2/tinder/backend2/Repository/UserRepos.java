package backend2.tinder.backend2.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Enums.GenderType;

@Repository
public interface UserRepos extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
    // @Query("select u from Users u where u.gender = :gender AND u.suspended = :suspended")
    List<Users> findByGenderAndSuspended(GenderType gender, boolean suspended);
}
