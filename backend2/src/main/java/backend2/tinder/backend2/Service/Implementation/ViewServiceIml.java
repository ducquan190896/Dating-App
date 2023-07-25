package backend2.tinder.backend2.Service.Implementation;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend2.tinder.backend2.Mapper.ViewMapper;
import backend2.tinder.backend2.Models.Interest;
import backend2.tinder.backend2.Models.Like;
import backend2.tinder.backend2.Models.Preference;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Response.View;
import backend2.tinder.backend2.Repository.UserRepos;
import backend2.tinder.backend2.Service.InterestService;
import backend2.tinder.backend2.Service.Likeservice;
import backend2.tinder.backend2.Service.PreferenceService;
import backend2.tinder.backend2.Service.UserService;
import backend2.tinder.backend2.Service.ViewService;
import backend2.tinder.backend2.Utils.DistanceCoding;
import io.netty.handler.codec.http.HttpContentEncoder.Result;

@Service
public class ViewServiceIml implements ViewService{
    @Autowired
    UserService userService;
    @Autowired
    UserRepos userRepos;
    @Autowired
    ViewMapper viewMapper;
    @Autowired
    PreferenceService preferenceService;
    @Autowired
    DistanceCoding distanceCoding;
    @Autowired
    InterestService interestService;
    @Autowired
    Likeservice likeservice;

    @Override
    public List<View> suggestionsForAuthUser() {
        Users authUser = userService.getAuthUser();
        List<Interest> authInterests = interestService.getByUser(authUser.getId()); 
        
        Preference authPreference = preferenceService.getByUserId(authUser.getId());
        LocalDate currentDate = LocalDate.now();
        List<Like> likes = likeservice.getByLikingUserIdForBlockCheck(authUser.getId());
        List<Users> likedUsers = likes.stream().map(like -> like.getLikedUser()).collect(Collectors.toList());

        List<Users> list = userRepos.findByGenderAndSuspended(authPreference.getGenderOrientation(), false);
        System.out.println(list);
        List<View> views = list
            .stream()
            .filter(user -> {
                int age = Period.between(user.getBirth(), currentDate).getYears(); 
                System.out.println(user.getUsername() + " age " + age);
                boolean isContain = likedUsers.contains(user);

                return age >= authPreference.getMinAge() && age <= authPreference.getMaxAge() && isContain == false;
            })
            .map(user -> {
                System.out.println(user.getUsername() + " " + user.getInterest());
                System.out.println(authUser.getUsername() + " " + authUser.getInterest());
                View view = viewMapper.mapToView(user);
                double distance = calculateDistance(authUser, user);
                System.out.println(user.getUsername() + " distance " + distance);
                view.setDistance(distance);
                double distanceScore = calculateDistanceScore(distance);
                System.out.println("distance score: " + distanceScore);

                double insterestScore = calculateInterestScore(authUser.getInterest() ,user.getInterest());
                System.out.println("interest score " + insterestScore);

                double matchingRate = calculateMatching(distanceScore, insterestScore);
                view.setMatchingRate(matchingRate);
                return view;
            })
            .filter(view -> view.getDistance() <= authPreference.getDistance())
            .collect(Collectors.toList());
        System.out.println(views);
        return views;
    }

    private double calculateDistance(Users user1, Users user2) {
        double distance = distanceCoding.distanceCalculator(user1.getLatitude(), user2.getLatitude(), user1.getLongitude(), user2.getLongitude());
        return distance;
    }

    private double calculateDistanceScore(double distance) {
        double score = 100 - (distance * 1);
        
        return score > 0 ? score : 0;
    }

    private double calculateInterestScore(List<Interest> interest1, List<Interest> interest2) {
        System.out.println("interest 1 : " + interest1);
        System.out.println("interest 2 : " + interest2);
        double commonInterst = 0;
        List<Interest> newInterest2 = interest2;
        for(int i = 0; i < interest1.size(); i++) {
            for( int j = 0; j < newInterest2.size(); j++) {
                if(interest1.get(i).getId() == newInterest2.get(j).getId()) {
                    commonInterst = commonInterst + 1;
                }
            }
        }
        if(commonInterst <= 3) {
            double result = commonInterst / 3 * 100;
            return result;
        }
        double result = 100 + (commonInterst - 4) * 10;
        return result;
    }
    private double calculateMatching(double distanceScore, double interestScore) {
        double matching = distanceScore * 0.2 + interestScore * 0.8;
        return matching;
    }
   
}
