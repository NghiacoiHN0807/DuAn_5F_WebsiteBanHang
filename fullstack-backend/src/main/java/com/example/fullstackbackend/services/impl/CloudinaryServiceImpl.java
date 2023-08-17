package com.example.fullstackbackend.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.fullstackbackend.services.CloudinaryService;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

    private final org.slf4j.Logger logger = LoggerFactory.getLogger(this.getClass());

    private final Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dqptpylda",
            "api_key", "263486346413811",
            "api_secret", "tbUmEdSjPCnnYS9xEnPpTQXFZ6k",
            "secure", true));

    @SuppressWarnings("rawtypes")
    @Override
    public String upload(MultipartFile file) {
        try {
            Map<String, String> param = new HashMap<>();
            param.put("folder", "j5-7f");

            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), param);
            String url = uploadResult.get("secure_url").toString();
            logger.info("The user successfully uploaded the file: " + url);
            return url;
        } catch (Exception ex) {
            logger.error("The userfailed to load to Cloudinary the image file: " + file.getName());
            logger.error(ex.getMessage());
            return null;
        }
    }

    @Override
    public void delete(String publicId) {
        try {
            Map<String, String> param = new HashMap<>();
            param.put("folder", "j5-7f");
            param.put("invalidate", "true");
            cloudinary.uploader().destroy(publicId, param);
        } catch (Exception ex) {
            logger.error("The userfailed to remove to Cloudinary the image file: " + publicId);
            logger.error(ex.getMessage());

        }
    }
}
