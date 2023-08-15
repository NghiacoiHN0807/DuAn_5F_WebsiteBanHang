package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.Anh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnhRepository extends JpaRepository<Anh, Integer> {

    @Query("SELECT x FROM Anh x WHERE x.idSp.idSp = ?1")
    List<Anh> findByIdSp(Integer idSp);
}
