package backend2.tinder.backend2.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import backend2.tinder.backend2.Models.Block;
import backend2.tinder.backend2.Models.Response.BlockResponse;

@Component
public class BlockMapper {
    @Autowired
    UserMapper userMapper;
    @Autowired
    ModelMapper modelMapper;
    
    // public BlockResponse mapBlockToResponse(Block block) {
    //     BlockResponse res = new BlockResponse(block.getId(), userMapper.mapUserToResponse(block.getBlockedUser()), userMapper.mapUserToResponse(block.getBlockingUser()), block.getCreatedDate());
    //     return res;
    // }
    public BlockResponse mapBlockToResponse(Block block) {
        BlockResponse res = modelMapper.map(block, BlockResponse.class);
        return res;
    }
}
