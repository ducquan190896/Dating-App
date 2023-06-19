package backend2.tinder.backend2.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import backend2.tinder.backend2.Models.Response.ImagesResponse;
import backend2.tinder.backend2.Models.Response.SingleImageRes;
import backend2.tinder.backend2.Service.ImageService;

@CrossOrigin
@RestController
@RequestMapping("/api/images")
public class ImageController {
    @Autowired
    ImageService imageService;

    @GetMapping("/image/{fileName}")
    public ResponseEntity<?> getImage(@PathVariable String fileName) {
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.IMAGE_PNG).body(imageService.getImageByFileName(fileName));
    }

    @PostMapping("/")
    public ResponseEntity<ImagesResponse> saveImages(@RequestParam(name = "file") List<MultipartFile> file) {
        return new ResponseEntity<ImagesResponse>(imageService.uploadImages(file), HttpStatus.CREATED);
    }
    @PostMapping("/singleImage")
    public ResponseEntity<SingleImageRes> saveImages(@RequestParam(name = "file") MultipartFile file) {
        return new ResponseEntity<SingleImageRes>(imageService.uploadImage(file), HttpStatus.CREATED);
    }
    
}
