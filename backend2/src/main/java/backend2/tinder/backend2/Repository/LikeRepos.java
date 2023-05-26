package backend2.tinder.backend2.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend2.tinder.backend2.Models.Like;
import backend2.tinder.backend2.Models.Users;

@Repository
public interface LikeRepos extends JpaRepository<Like, Long> {
    @Query("select like from Like1 like LEFT JOIN like.likedUser liked LEFT JOIN like.likingUser liking where liked.id = :likedUser AND liking.id = :likingUser")
    Optional<Like> findByLikedUserAndLikingUser(long likedUser, long likingUser);
    Optional<Like> findByLikedUserAndLikingUser(Users likedUser, Users likingUser);
    List<Like> findByLikedUser(Users likedUser);
    List<Like> findByLikingUser(Users likingUser);
}
