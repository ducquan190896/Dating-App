package backend2.tinder.backend2.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend2.tinder.backend2.Models.Image;



@Repository
public interface ImageRepos extends JpaRepository<Image, Long> {
    Optional<Image> findByFileName(String fileName);
}
