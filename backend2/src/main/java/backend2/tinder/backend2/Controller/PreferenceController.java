package backend2.tinder.backend2.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend2.tinder.backend2.Mapper.PreferenceMapper;
import backend2.tinder.backend2.Models.Preference;
import backend2.tinder.backend2.Models.Response.PreferenceResponse;
import backend2.tinder.backend2.Service.PreferenceService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/preferences")
public class PreferenceController {
    @Autowired
    PreferenceService preferenceService;
    @Autowired
    PreferenceMapper preferenceMapper;

    @GetMapping("/user/{id}")
    public ResponseEntity<PreferenceResponse> getByUserId(@PathVariable long id) {
        return new ResponseEntity<PreferenceResponse>(preferenceMapper.mapPreferenceToResponse(preferenceService.getByUserId(id)), HttpStatus.OK);
    }
    @GetMapping("/username/{username}")
    public ResponseEntity<PreferenceResponse> getByUsername(@PathVariable String username) {
        return new ResponseEntity<PreferenceResponse>(preferenceMapper.mapPreferenceToResponse(preferenceService.getByUsername(username)), HttpStatus.OK);
    }
    @PostMapping("/preference")
    public ResponseEntity<PreferenceResponse> save(@Valid @RequestBody Preference preference) {
        return new ResponseEntity<PreferenceResponse>(preferenceMapper.mapPreferenceToResponse(preferenceService.save(preference)), HttpStatus.CREATED);
    }

    @PutMapping("/preference")
    public ResponseEntity<PreferenceResponse> update(@Valid @RequestBody Preference preference) {
        return new ResponseEntity<PreferenceResponse>(preferenceMapper.mapPreferenceToResponse(preferenceService.update(preference)), HttpStatus.CREATED);
    }
}
