package backend2.tinder.backend2.Service;

import java.util.List;

import backend2.tinder.backend2.Models.Interest;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Request.InterestsRequest;

public interface InterestService {
    Interest save(Interest interest);
    Interest save(Interest interest, Users user);
    Interest update(Long id, String name);
    Interest getByName(String name);
    Interest getById(Long id);
    List<Interest> getByUser(Long userId);
    List<Interest> addInterestToUser(InterestsRequest request);
}
