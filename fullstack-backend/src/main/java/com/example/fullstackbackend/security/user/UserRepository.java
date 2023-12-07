package com.example.fullstackbackend.security.user;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<TaiKhoanUser, Integer> {

    @Query("select t from TaiKhoanUser t where t.email = ?1 and( t.trangThai=0 or t.trangThai=1)")
    TaiKhoanUser findByEmail(String email);


    @Query("select (count(t) > 0) from TaiKhoanUser t where upper(t.email) = upper(?1)")
    boolean existsByEmailAllIgnoreCase(String email);

}
