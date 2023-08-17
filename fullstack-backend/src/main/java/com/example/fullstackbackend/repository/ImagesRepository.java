package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository

public interface ImagesRepository extends JpaRepository<Images, Integer> {

    @Query("SELECT i FROM Images i WHERE i.idSp.idSp = :idSp")
    List<Images> findByIdCtsp_IdSp(@Param("idSp") Integer idSp);

    @Query("SELECT g FROM Images g WHERE g.idSp.idSp = :idSp")
    List<Images> findImagesByIdSp(@Param("idSp") Integer idSp);
}