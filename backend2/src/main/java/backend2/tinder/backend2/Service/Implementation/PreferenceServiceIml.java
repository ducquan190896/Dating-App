package backend2.tinder.backend2.Service.Implementation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import backend2.tinder.backend2.Exception.EntityNotFoundException;
import backend2.tinder.backend2.Models.Preference;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Repository.PreferenceRepos;
import backend2.tinder.backend2.Repository.UserRepos;
import backend2.tinder.backend2.Service.PreferenceService;
import backend2.tinder.backend2.Service.UserService;

@Service
public class PreferenceServiceIml implements PreferenceService {
    @Autowired
    UserRepos userRepos;
    @Autowired
    PreferenceRepos preferenceRepos;
    @Autowired
    UserService userService;

    @Override
    public Preference save(Preference preference) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userService.getUserByUsername(username);
        Optional<Preference> entity = preferenceRepos.findByUser(user);
        if(entity.isPresent()) {
            return update( preference);
        } 
        Preference preference2 = new Preference(preference.getDistance(), preference.getGenderOrientation(), preference.getMaxAge(), preference.getMinAge());
        preference2.setUser(user);
        preferenceRepos.save(preference2);

        user.setPreference(preference2);
        userRepos.save(user);

        return preference2;
    }

    @Override
    public Preference update(Preference preference) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userService.getUserByUsername(username);
        Optional<Preference> entity = preferenceRepos.findByUser(user);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the preference not found");
        } 
        Preference preference2 = entity.get();
        preference2.setDistance(preference.getDistance());
        preference2.setGenderOrientation(preference.getGenderOrientation());
        preference2.setMaxAge(preference.getMaxAge());
        preference2.setMinAge(preference.getMinAge());
        preferenceRepos.save(preference2);

        user.setPreference(preference2);
        userRepos.save(user);
        
        return preference2;
    }

    @Override
    public Preference getByUserId(Long userId) {
        Users user = userService.getUserById(userId);
        Optional<Preference> entity = preferenceRepos.findByUser(user);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the preference not found");
        } 
        Preference preference = entity.get();
        return preference;
    }

    @Override
    public Preference getByUsername(String username) {
        Users user = userService.getUserByUsername(username);
        Optional<Preference> entity = preferenceRepos.findByUser(user);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the preference not found");
        } 
        Preference preference = entity.get();
        return preference;
    }
}
