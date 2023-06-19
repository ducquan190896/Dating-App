package backend2.tinder.backend2.Service;

import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Request.PasswordForm;
import backend2.tinder.backend2.Models.Request.UserSignIn;
import backend2.tinder.backend2.Models.Request.UserSignUp;
import backend2.tinder.backend2.Models.Response.UserResponse;

public interface UserService {
    UserResponse updateProfile(String firstname, String surename, String description);
    UserResponse getUserResById(Long id);
    UserResponse getUseResByUsername(String username);
    Users getUserById(Long id);
    Users getUserByUsername(String username);
    UserResponse updatePassword(PasswordForm passwordForm);
    UserResponse saveUser(UserSignUp userSignup);
    UserResponse signIn(UserSignIn userSignIn);
    UserResponse loadAuthUserRes();
    Users getAuthUser();
    Users addImage(String img);
    Users removeImage(String img);
}
