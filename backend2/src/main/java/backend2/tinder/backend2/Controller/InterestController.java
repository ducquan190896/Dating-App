package backend2.tinder.backend2.Controller;

import java.util.List;

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

import backend2.tinder.backend2.Models.Interest;
import backend2.tinder.backend2.Models.Request.InterestsRequest;
import backend2.tinder.backend2.Service.InterestService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/interests")
public class InterestController {
    @Autowired
    InterestService interestService;
    
    @PostMapping("/interest")
    public ResponseEntity<Interest> save(@RequestBody @Valid Interest interest) {
        return new ResponseEntity<Interest>(interestService.save(interest), HttpStatus.CREATED);
    }
    @PostMapping("/addToUser")
    public ResponseEntity<List<Interest>> save(@RequestBody @Valid InterestsRequest request) {

        return new ResponseEntity<List<Interest>>(interestService.addInterestToUser(request), HttpStatus.OK);
    }

    @PutMapping("/interest/{id}/name/{name}")
    public ResponseEntity<Interest> update(@PathVariable Long id, @PathVariable String name) {
        return new ResponseEntity<Interest>(interestService.update(id, name), HttpStatus.CREATED);
    }

    @PutMapping("/interest/{id}/remove/authUser")
    public ResponseEntity<HttpStatus> removeInterestFromUser(@PathVariable Long id) {
        interestService.removeInterestFromUser(id);
        return new ResponseEntity<HttpStatus>( HttpStatus.CREATED);
    }

    @GetMapping("/interest/{name}")
    public ResponseEntity<Interest> get( @PathVariable String name) {
        return new ResponseEntity<Interest>(interestService.getByName(name), HttpStatus.CREATED);
    }
    @GetMapping("/interest/{id}")
    public ResponseEntity<Interest> get( @PathVariable long id) {
        return new ResponseEntity<Interest>(interestService.getById(id), HttpStatus.CREATED);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Interest>> getByUser( @PathVariable long userId) {
        return new ResponseEntity<List<Interest>>(interestService.getByUser(userId), HttpStatus.CREATED);
    }
}
