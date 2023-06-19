package backend2.tinder.backend2.Service.Implementation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import backend2.tinder.backend2.Models.Image;
import backend2.tinder.backend2.Models.Response.ImagesResponse;
import backend2.tinder.backend2.Models.Response.SingleImageRes;
import backend2.tinder.backend2.Exception.BadResultException;
import backend2.tinder.backend2.Exception.EntityNotFoundException;
import backend2.tinder.backend2.Repository.ImageRepos;
import backend2.tinder.backend2.Service.ImageService;
import backend2.tinder.backend2.Utils.ImageUtil;

@Service
public class ImageServiceIml implements ImageService {
    @Autowired
    ImageRepos imageRepos;
    @Autowired
    ImageUtil imageUtil;

    @Override
    public byte[] getImageByFileName(String fileName) {
       Optional<Image> entity = imageRepos.findByFileName(fileName);
       if(!entity.isPresent()) {
        throw new EntityNotFoundException("the image not found");
       }
       Image image = entity.get();
       return imageUtil.decompressImage(image.getDatabyte());
    }

    @Override
    public SingleImageRes uploadImage(MultipartFile file) {
        try {
            String fileName =  file.getOriginalFilename() + "_" + UUID.randomUUID();
        System.out.println(file.getOriginalFilename());
        String type = file.getContentType();
        byte[] databyte = imageUtil.compressImage(file.getBytes());
        Image image = new Image(fileName, type, databyte);
        imageRepos.save(image);
        SingleImageRes res = new SingleImageRes(fileName);
        return res;
        } catch (IOException ex) {
            throw new BadResultException(ex.getMessage());
        }
    }

    @Override
    public ImagesResponse uploadImages(List<MultipartFile> files) {
       List<String> fileNames = new ArrayList<>();

       files.stream().forEach(file -> {
            try {
                String fileName =  file.getOriginalFilename() + "_" + UUID.randomUUID();
            System.out.println(file.getOriginalFilename());
            String type = file.getContentType();
            byte[] databyte = imageUtil.compressImage(file.getBytes());
            Image image = new Image(fileName, type, databyte);
            imageRepos.save(image);
            fileNames.add(fileName);
            } catch (IOException ex) {
                throw new BadResultException(ex.getMessage());
            }

       });

       return new ImagesResponse(fileNames);
    }

    
}
