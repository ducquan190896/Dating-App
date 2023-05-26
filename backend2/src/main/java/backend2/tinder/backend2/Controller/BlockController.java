package backend2.tinder.backend2.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend2.tinder.backend2.Mapper.BlockMapper;
import backend2.tinder.backend2.Models.Block;
import backend2.tinder.backend2.Models.Response.BlockResponse;
import backend2.tinder.backend2.Service.BlockService;

@RestController
@RequestMapping("/api/blocks")
public class BlockController {
    @Autowired
    BlockMapper blockMapper;
    @Autowired
    BlockService blockService;

    @GetMapping("/{blockedId}")
    public ResponseEntity<BlockResponse> getBlockByBlockedIdAndAuth(@PathVariable Long blockedId) {
        Block block = blockService.getByBlockedUserIdAndAuthUser(blockedId);
        BlockResponse res = blockMapper.mapBlockToResponse(block);
        return new ResponseEntity<BlockResponse>(res, HttpStatus.OK);
    }
    @GetMapping("/block/{id}")
    public ResponseEntity<BlockResponse> getBlockByBlockId(@PathVariable Long id) {
        Block block = blockService.getById(id);
        BlockResponse res = blockMapper.mapBlockToResponse(block);
        return new ResponseEntity<BlockResponse>(res, HttpStatus.OK);
    }
    
    @PostMapping("/{blockedId}")
    public ResponseEntity<Object> saveBlock(@PathVariable Long blockedId) {
        Block block = blockService.save(blockedId);
        if(block == null) {
            return new ResponseEntity<Object>("you already blocked the user, cannot block twivce", HttpStatus.BAD_REQUEST);
        }
        BlockResponse res = blockMapper.mapBlockToResponse(block);
        return new ResponseEntity<Object>(res, HttpStatus.CREATED);
    }
}
