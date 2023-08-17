package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.Anh;

import java.util.List;

public interface AnhService {
    public List<Anh> getAnhById(Integer idSp);

    public Anh getOne(Integer idImage);

    public Anh add(Anh a);

    public Anh delete(Integer id);

    public Boolean checkSL();
}
