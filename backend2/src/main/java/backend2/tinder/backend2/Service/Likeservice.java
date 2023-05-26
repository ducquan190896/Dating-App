package backend2.tinder.backend2.Service;

import java.util.List;

import backend2.tinder.backend2.Models.Like;
import backend2.tinder.backend2.Models.Users;

public interface Likeservice {
    //show the list of all people (likingUsers) who liked the likedUser
    List<Like> getByLikedUserId(long likedUserId);
    List<Like> getByLikingUserId(long likingUserId);
    Like save(long likedUserId);
    Like getByLikedAndLiking(long likedUserId, long likingUserId);
    boolean isExist(long likedUserId, long likingUserId);
}
