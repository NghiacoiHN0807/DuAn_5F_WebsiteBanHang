package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.XuatXu;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface XuatxuService {

    List<XuatXu> getAll();

    Page<XuatXu> xuatXuPage(Integer pageNo, Integer size);

    XuatXu add(XuatXu add);

    void delete(Integer id);

    Boolean checkExists(Integer id);

    XuatXu update(XuatXu update);

    Optional<XuatXu> detail(Integer id);
}
