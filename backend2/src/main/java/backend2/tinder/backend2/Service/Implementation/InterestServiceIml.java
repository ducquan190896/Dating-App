package backend2.tinder.backend2.Service.Implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend2.tinder.backend2.Exception.EntityExistingException;
import backend2.tinder.backend2.Exception.EntityNotFoundException;
import backend2.tinder.backend2.Models.Interest;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Request.InterestsRequest;
import backend2.tinder.backend2.Repository.InterestRepos;
import backend2.tinder.backend2.Repository.UserRepos;
import backend2.tinder.backend2.Service.InterestService;
import backend2.tinder.backend2.Service.UserService;

@Service
@Transactional
public class InterestServiceIml implements  InterestService{
    @Autowired
    InterestRepos interestRepos;
    @Autowired
    UserService userService;
    @Autowired
    UserRepos userRepos;
    @Override
    public Interest getByName(String name) {
        Optional<Interest> entity = interestRepos.findByName(name);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the interest not found");
        }
        Interest interest = entity.get();
        return interest;
    }
    @Override
    public List<Interest> getByUser(Long userId) {
        Users user = userService.getUserById(userId);
        List<Interest> interests = interestRepos.findByUsers(user);
        return interests;
    }
    @Override
    public Interest save(Interest interest) {
        Users authUser = userService.getAuthUser();
        Optional<Interest> entity = interestRepos.findByName(interest.getName());
        if(entity.isPresent()) {
            interest = entity.get();
            interest.getUsers().add(authUser);
            interest = interestRepos.save(interest);
            authUser.getInterest().add(interest);
            
        } else {
            interest.getUsers().add(authUser);
            interest = interestRepos.save(interest);
            authUser.getInterest().add(interest);
        }	
        userRepos.save(authUser);
        return interestRepos.save(interest);
    }

    @Override
    public Interest save(Interest interest, Users user) {
        Optional<Interest> entity = interestRepos.findByName(interest.getName());
        if(entity.isPresent()) {
            Interest interest2 = entity.get();
            interest2.getUsers().add(user);
            interestRepos.save(interest2);
            user.getInterest().add(interest2);
            userRepos.save(user);
            return interest2;
        }
        Interest interest2 = interestRepos.save(interest);
        interest2.getUsers().add(user);
        interestRepos.save(interest2);
        user.getInterest().add(interest2);
        userRepos.save(user);
        return  interest2;
    }

    @Override
    public List<Interest> addInterestToUser(InterestsRequest request) {
        Users authUser = userService.getAuthUser();
        List<Interest> lists = new ArrayList<>();
        request.getInterests().stream().forEach(hobby -> {
                Interest interest = new Interest(hobby);
                Optional<Interest> entity = interestRepos.findByName(interest.getName());
				if(entity.isPresent()) {
					interest = entity.get();
					interest.getUsers().add(authUser);
					interest = interestRepos.save(interest);
					authUser.getInterest().add(interest);
					
				} else {
                    interest.getUsers().add(authUser);
                    interest = interestRepos.save(interest);
                    authUser.getInterest().add(interest);
               }				
        });
        userRepos.save(authUser);
        return lists;
    }


    @Override
    public Interest update(Long id, String name) {
        Interest interest = getById(id);
        interest.setName(name);
        interestRepos.save(interest);
        return interest;
    }

    @Override
    public Interest getById(Long id) {
        Optional<Interest> entity = interestRepos.findById(id);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the interest not found");
        }
        Interest interest = entity.get();
        return interest;
    }
    

}
