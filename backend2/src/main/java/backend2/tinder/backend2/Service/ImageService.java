package backend2.tinder.backend2.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import backend2.tinder.backend2.Models.Response.ImagesResponse;
import backend2.tinder.backend2.Models.Response.SingleImageRes;



public interface ImageService {
    byte[] getImageByFileName(String fileName);
    ImagesResponse uploadImages(List<MultipartFile> files); 
    SingleImageRes uploadImage(MultipartFile file);
}
