package backend2.tinder.backend2.Service.Implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend2.tinder.backend2.Exception.BadResultException;
import backend2.tinder.backend2.Exception.EntityNotFoundException;
import backend2.tinder.backend2.Models.Like;
import backend2.tinder.backend2.Models.Match;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Repository.BlockRepos;
import backend2.tinder.backend2.Repository.LikeRepos;
import backend2.tinder.backend2.Repository.MatchRepos;
import backend2.tinder.backend2.Repository.UserRepos;
import backend2.tinder.backend2.Service.BlockService;
import backend2.tinder.backend2.Service.Likeservice;
import backend2.tinder.backend2.Service.MatchService;
import backend2.tinder.backend2.Service.UserService;

@Service
public class LikeServiceIml  implements Likeservice{
    
    @Autowired
    LikeRepos likeRepos;
    @Autowired
    UserService userService;
    @Autowired
    MatchRepos matchRepos;
    @Autowired
    BlockService blockService;
    @Autowired
    MatchService matchService;

    @Override
    public Like getByLikedAndLiking(long likedUserId, long likingUserId) {
        Users likedUser = userService.getUserById(likedUserId);
        Users likingUser = userService.getUserById(likingUserId);

        Optional<Like> entity = likeRepos.findByLikedUserAndLikingUser(likedUser, likingUser);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the like not found");
        }
        return entity.get();
    }
    @Override
    public List<Like> getByLikedUserId(long likedUserId) {
        Users likedUser = userService.getUserById(likedUserId);
        List<Like> likingUsers = likeRepos.findByLikedUser(likedUser);
        likingUsers = likingUsers.stream().filter(lik -> lik.getIsBlock() == false && lik.getLikingUser().getSuspended() == false).collect(Collectors.toList());
        likingUsers.sort((a, b) -> b.getCreatedDate().compareTo(a.getCreatedDate()));
        return likingUsers;
    }
    @Override
    public List<Like> getByLikingUserId(long likingUserId) {
        Users likingUser = userService.getUserById(likingUserId);
        List<Like> likedUsers = likeRepos.findByLikingUser(likingUser);
        likedUsers = likedUsers.stream().filter(lik -> lik.getIsBlock() == false && lik.getLikedUser().getSuspended() == false).collect(Collectors.toList());
        likedUsers.sort((a, b) -> b.getCreatedDate().compareTo(a.getCreatedDate()));
        return likedUsers;
    }

    @Override
    public boolean isExist(long likedUserId, long likingUserId) {
        Users likedUser = userService.getUserById(likedUserId);
        Users likingUser = userService.getUserById(likingUserId);

        Optional<Like> entity = likeRepos.findByLikedUserAndLikingUser(likedUser, likingUser);
        if(!entity.isPresent()) {
          return false;
        }
        return true;
    }

    @Override
    public Like save(long likedUserId) {
        Users authUser = userService.getAuthUser();
        Users likedUser = userService.getUserById(likedUserId);
        if(authUser.getId() == likedUserId) {
            throw new BadResultException("you cannot like yourself");
        }
        if(authUser.getSuspended() == true || likedUser.getSuspended() == true) {
            throw new BadResultException("the user suspended, cannot like");
        }

        boolean isExist = isExist(likedUserId, authUser.getId());
        if(isExist == true) {
            throw new BadResultException("you cannot like the user twice");
        }

        boolean isBlockByLikedUser = blockService.isBlockExist(authUser.getId(), likedUserId);
        if(isBlockByLikedUser == true) {
            throw new BadResultException("the user blocked you, you cannot like him/her");
        }

        Like like = new Like(likedUser, authUser);
        likeRepos.save(like);
        
        boolean isExist2 = isExist(authUser.getId(), likedUserId);
        if(isExist2 == true) { 
            Match match = matchService.save(authUser, likedUser);
            updateMatchIdForLikes(likedUserId, authUser.getId(), match.getId()); 
        }
        
        return like;
    }

    private void updateMatchIdForLikes(long likedUserId, long likingUserId, long matchId) {
        Like like1 = getByLikedAndLiking(likedUserId, likingUserId);
        Like like2 = getByLikedAndLiking(likingUserId, likedUserId);
        like1.setMatchId(matchId);
        like2.setMatchId(matchId);
        likeRepos.save(like1);
        likeRepos.save(like2);
    }

    
}
