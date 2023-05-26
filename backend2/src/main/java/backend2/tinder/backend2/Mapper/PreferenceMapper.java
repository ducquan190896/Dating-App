package backend2.tinder.backend2.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import backend2.tinder.backend2.Models.Preference;
import backend2.tinder.backend2.Models.Response.PreferenceResponse;

@Component
public class PreferenceMapper {
    @Autowired
    ModelMapper modelMapper;

    public PreferenceResponse mapPreferenceToResponse(Preference preference) {
        PreferenceResponse res = modelMapper.map(preference, PreferenceResponse.class);
        res.setUserId(preference.getUser().getId());
        return res;
    }
}
