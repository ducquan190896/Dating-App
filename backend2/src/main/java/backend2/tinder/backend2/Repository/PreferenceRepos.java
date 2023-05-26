package backend2.tinder.backend2.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend2.tinder.backend2.Models.Preference;
import backend2.tinder.backend2.Models.Users;

@Repository
public interface PreferenceRepos extends JpaRepository<Preference, Long> {
    Optional<Preference> findByUser(Users user);
}
