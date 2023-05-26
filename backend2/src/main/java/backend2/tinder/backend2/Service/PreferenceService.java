package backend2.tinder.backend2.Service;

import backend2.tinder.backend2.Models.Preference;

public interface PreferenceService {
    Preference save(Preference preference);
    Preference update(Preference preference);
    Preference getByUserId(Long userId);
    Preference getByUsername(String username);
}
