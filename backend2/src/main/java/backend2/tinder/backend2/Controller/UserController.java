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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend2.tinder.backend2.Mapper.UserMapper;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Request.PasswordForm;
import backend2.tinder.backend2.Models.Request.UserSignIn;
import backend2.tinder.backend2.Models.Request.UserSignUp;
import backend2.tinder.backend2.Models.Response.UserResponse;
import backend2.tinder.backend2.Service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    UserMapper userMapper;

    @GetMapping("/username/{username}")
    public ResponseEntity<UserResponse> getByUsername(@PathVariable String username) {
        return new ResponseEntity<UserResponse>(userService.getUseResByUsername(username), HttpStatus.OK);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<UserResponse> getByid(@PathVariable long id) {
        return new ResponseEntity<UserResponse>(userService.getUserResById(id), HttpStatus.OK);
    }
    @PutMapping("/signIn")
    public ResponseEntity<UserResponse> signIn(@Valid @RequestBody UserSignIn userSignIn) {
        return new ResponseEntity<UserResponse>(userService.signIn(userSignIn), HttpStatus.OK);
    }
    //requires token
    @GetMapping("/authUser/getAuthUser")
    public ResponseEntity<UserResponse> getAuthUser() {
        return new ResponseEntity<UserResponse>(userService.loadAuthUserRes(), HttpStatus.OK);
    }
    //requires token
    @GetMapping("/authUser/updatePassword")
    public ResponseEntity<UserResponse> updatePassword(@Valid @RequestBody PasswordForm passwordForm) {
        return new ResponseEntity<UserResponse>(userService.updatePassword(passwordForm), HttpStatus.OK);
    }
    @PostMapping("/signup")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserSignUp userSignup) {
        return new ResponseEntity<UserResponse>(userService.saveUser(userSignup), HttpStatus.CREATED);
    }

    @PutMapping("/addImage/{image}")
    public ResponseEntity<UserResponse> addImage(@PathVariable String image) {
        UserResponse res = userMapper.mapUserToResponse(userService.addImage(image));
        return new ResponseEntity<UserResponse>(res, HttpStatus.OK);
    }
    @PutMapping("/removeImage/{image}")
    public ResponseEntity<UserResponse> removeImage(@PathVariable String image) {
        UserResponse res = userMapper.mapUserToResponse(userService.removeImage(image));
        return new ResponseEntity<UserResponse>(res, HttpStatus.OK);
    }
    @PutMapping("/authUser/updateProfile")
    public ResponseEntity<UserResponse> removeImage(@RequestParam(required = false) String firstname, @RequestParam(required = false) String surename, @RequestParam(required = false) String description) {
        return new ResponseEntity<UserResponse>(userService.updateProfile(firstname, surename, description), HttpStatus.OK);
    }
}
