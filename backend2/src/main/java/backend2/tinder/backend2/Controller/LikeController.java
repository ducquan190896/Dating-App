package backend2.tinder.backend2.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend2.tinder.backend2.Mapper.LikeMapper;
import backend2.tinder.backend2.Models.Like;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Models.Response.LikeResponse;
import backend2.tinder.backend2.Service.Likeservice;
import backend2.tinder.backend2.Service.UserService;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
    @Autowired
    LikeMapper likeMapper;
    @Autowired
    Likeservice likeservice;
    @Autowired
    UserService userService;

    //get the list of people are liking the authUser
    @GetMapping("/likings/")
    public ResponseEntity<List<LikeResponse>> getLikings() {
        Users authUser = userService.getAuthUser();
        List<Like> likes = likeservice.getByLikedUserId(authUser.getId());
        List<LikeResponse> res = likes.stream().map(like -> likeMapper.mapLikeToResponse(like)).collect(Collectors.toList());
        return new ResponseEntity<List<LikeResponse>>(res, HttpStatus.OK);
    }
    //save like
    @PostMapping("/like/likedUser/{likedUser}")
    public ResponseEntity<LikeResponse> save(@PathVariable long likedUser) {
        Like like = likeservice.save(likedUser);
        LikeResponse res = likeMapper.mapLikeToResponse(like);
        return new ResponseEntity<LikeResponse>(res, HttpStatus.CREATED);
    }
    @GetMapping("/likedUser/{likedUser}/likingUser/{likingUser}")
    public ResponseEntity<LikeResponse> getByLikedAndLiking(@PathVariable long likedUser, @PathVariable long likingUser) {
        Like like = likeservice.getByLikedAndLiking(likedUser, likingUser);
        LikeResponse res = likeMapper.mapLikeToResponse(like);
        return new ResponseEntity<LikeResponse>(res, HttpStatus.OK);
    }

    @GetMapping("/isExist/likedUser/{likedUser}/likingUser/{likingUser}")
    public ResponseEntity<Boolean> getExistByLikedAndLiking(@PathVariable long likedUser, @PathVariable long likingUser) {
        return new ResponseEntity<Boolean>(likeservice.isExist(likedUser, likingUser), HttpStatus.OK);
    }
}
