package backend2.tinder.backend2.Utils;

import java.time.LocalDate;
import java.time.Month;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import backend2.tinder.backend2.Models.Interest;
import backend2.tinder.backend2.Models.Preference;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Enums.GenderType;
import backend2.tinder.backend2.Models.Enums.Role;
import backend2.tinder.backend2.Repository.BlockRepos;
import backend2.tinder.backend2.Repository.InterestRepos;
import backend2.tinder.backend2.Repository.LikeRepos;
import backend2.tinder.backend2.Repository.MatchRepos;
import backend2.tinder.backend2.Repository.PreferenceRepos;
import backend2.tinder.backend2.Repository.ReportRepos;
import backend2.tinder.backend2.Repository.UserRepos;

@Component
public class SampleGenerator {
    @Autowired
    UserRepos userRepos;
    @Autowired
    InterestRepos interestRepos;
    @Autowired
    PreferenceRepos preferenceRepos;
    @Autowired
    ReportRepos reportRepos;
    @Autowired
    BlockRepos blockRepos;
    @Autowired
    MatchRepos matchRepos;
    @Autowired
    LikeRepos likeRepos;

    public Users generateUser(String username, String firstname, GenderType gender, LocalDate birth, double latitude, double longitude, String imageurl, Long distanceLike, GenderType genderLike, int maxAge, int minAge, List<String> interests) {
        Users user = new Users(username, new BCryptPasswordEncoder().encode("123456"), firstname, username, gender, "hello i looking for a friend", birth, latitude, longitude);
        user.getRoles().add(Role.USER);
        user.getAvatarUrls().add(imageurl);
        userRepos.save(user);

        Preference preference = new Preference(distanceLike, genderLike, maxAge, minAge);
        preference.setUser(user);
        preferenceRepos.save(preference);

		List<Interest> interests1 = interests
            .stream()
            .map(hobby -> {
				Interest interest = new Interest(hobby);
				Optional<Interest> entity = interestRepos.findByName(interest.getName());
				if(entity.isPresent()) {
					interest = entity.get();
					interest.getUsers().add(user);
					interest = interestRepos.save(interest);
					user.getInterest().add(interest);
					return interest;
				} 
				interest.getUsers().add(user);
				interest = interestRepos.save(interest);
				user.getInterest().add(interest);
				return	interest;
			}).collect(Collectors.toList());
			userRepos.save(user);

        return user;
    }
}
