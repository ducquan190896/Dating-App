package backend2.tinder.backend2.Service;

import backend2.tinder.backend2.Models.Block;

public interface BlockService {
    Block getById(long id);
    Block getByBlockedUserIdAndAuthUser(long blockedUserId);
    Block save(long blockedId);
    boolean isBlockExist(long blockedUserId, long blockingUserId);
    void deleteBlockByBlockedUserIdAndBlockingUser(long blockedUserId, long blockingUserId);
}
