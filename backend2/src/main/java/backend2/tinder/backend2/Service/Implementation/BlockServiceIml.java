package backend2.tinder.backend2.Service.Implementation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend2.tinder.backend2.Exception.BadResultException;
import backend2.tinder.backend2.Exception.EntityNotFoundException;
import backend2.tinder.backend2.Models.Block;
import backend2.tinder.backend2.Models.Like;
import backend2.tinder.backend2.Models.Match;
import backend2.tinder.backend2.Models.Users;
import backend2.tinder.backend2.Repository.BlockRepos;
import backend2.tinder.backend2.Repository.LikeRepos;
import backend2.tinder.backend2.Repository.MatchRepos;
import backend2.tinder.backend2.Service.BlockService;
import backend2.tinder.backend2.Service.Likeservice;
import backend2.tinder.backend2.Service.MatchService;
import backend2.tinder.backend2.Service.UserService;

@Service
public class BlockServiceIml implements BlockService{
    @Autowired
    UserService userService;
    @Autowired
    BlockRepos blockRepos;
    @Autowired
    LikeRepos likeRepos;
    @Autowired
    MatchRepos matchRepos;
    

    @Override
    public Block getByBlockedUserIdAndAuthUser(long blockedUserId) {
        Users blockedUser = userService.getUserById(blockedUserId);
        Users authUser = userService.getAuthUser();
        Optional<Block> entity = blockRepos.findByBlockedUserAndBlockingUser(blockedUser, authUser);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the block not found");
        }
        return entity.get();
    }

    @Override
    public Block getById(long id) {
        Optional<Block> entity = blockRepos.findById(id);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the block not found");
        }
        return entity.get();
    }

    @Override
    public Block save(long blockedId) {
        Users blockedUser = userService.getUserById(blockedId);
        Users authUser = userService.getAuthUser();
        if(blockedUser.getId() == authUser.getId()) {
            throw new BadResultException("you cannot block yourself");
        }
        System.out.println("find the entity");
        Optional<Block> entity = blockRepos.findByBlockedUserAndBlockingUser(blockedUser, authUser);
        System.out.println("entity is checking");
        if(entity.isPresent()) {
            return null;
        }
        Block block = new Block(blockedUser, authUser);
        blockRepos.save(block);
        System.out.println(block);
        //set the block status for the likes
        Optional<Like> entitylike1 = likeRepos.findByLikedUserAndLikingUser(blockedUser.getId(), authUser.getId());
        if(entitylike1.isPresent()) {
            Like like1 = entitylike1.get();
            like1.setBlocked(true);
            likeRepos.save(like1);
        } else {
            System.out.println("not found like1");
        }

        Optional<Like> entitylike2 = likeRepos.findByLikedUserAndLikingUser(authUser, blockedUser);
        if(entitylike2.isPresent()) {
            Like like2 = entitylike2.get();
            like2.setBlocked(true);
            likeRepos.save(like2);
        } else {
            System.out.println("not found like2");
        }

        //set block status for match
        Optional<Match> entityMatch = matchRepos.findByUser1AndUser2(blockedId, authUser.getId());
        if(!entityMatch.isPresent()) {
           System.out.println("match not found");
        } else {
            Match match = entityMatch.get();
            match.setBlocked(true);
            matchRepos.save(match);
        }
    

        return block;
    }

    @Override
    public boolean isBlockExist(long blockedUserId, long blockingUserId) {
        Users blockedUser = userService.getUserById(blockedUserId);
        Users blockingUser = userService.getUserById(blockingUserId);
        Optional<Block> entity = blockRepos.findByBlockedUserAndBlockingUser(blockedUser, blockingUser);
        if(entity.isPresent()) {
            return true;
        } else {
            return false;
        }
    }
    @Override
    public void deleteBlockByBlockedUserIdAndBlockingUser(long blockedUserId, long blockingUserId) {
        Users blockedUser = userService.getUserById(blockedUserId);
        Users blockingUser = userService.getUserById(blockingUserId);
        Optional<Block> entity = blockRepos.findByBlockedUserAndBlockingUser(blockedUser, blockingUser);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the block not found");
        }
        Block block = entity.get();
        blockRepos.delete(block);
    }
    
}
