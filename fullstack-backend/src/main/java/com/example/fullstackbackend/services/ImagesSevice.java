package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.Images;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ImagesSevice {

    List<Images> getAll();

    List<Images> findImagesByIdSp(Integer idSp);

    Page<Images> imagesPage(Integer pageNo, Integer size);

    Images add(Images add);

    void delete(Integer id);

    Boolean checkExists(Integer id);

    Images update(Images update);

    Optional<Images> detail(Integer id);

    List<Images> findByIdCtsp_IdSp(Integer idSp);
}
