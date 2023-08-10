package com.example.fullstackbackend.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "xuat_xu")
public class XuatXu {
    @Id
    @Column(name = "id_xx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idXx;

    @NotBlank(message = "Not Blank")
    @Column(name = "ma_xx")
    private String maXx;

    @NotBlank(message = "Not Blank")
    @Column(name = "ten_nuoc")
    private String tenNuoc;

    @NotNull(message = "Not Blank")
    @Column(name = "trang_thai")
    private Integer trangThai;

}
