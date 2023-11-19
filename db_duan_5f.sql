CREATE DATABASE  IF NOT EXISTS `duan_5f` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `duan_5f`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: duan_5f
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat_lieu`
--

DROP TABLE IF EXISTS `chat_lieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_lieu` (
  `id_cl` int NOT NULL AUTO_INCREMENT,
  `ma_cl` varchar(255) DEFAULT NULL,
  `ten_cl` varchar(255) DEFAULT NULL,
  `tinh_trang` int DEFAULT '0',
  PRIMARY KEY (`id_cl`),
  UNIQUE KEY `MaCL` (`ma_cl`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_lieu`
--

LOCK TABLES `chat_lieu` WRITE;
/*!40000 ALTER TABLE `chat_lieu` DISABLE KEYS */;
INSERT INTO `chat_lieu` VALUES (11,'CL_01','Vai Tho',0);
/*!40000 ALTER TABLE `chat_lieu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi_tiet_san_pham`
--

DROP TABLE IF EXISTS `chi_tiet_san_pham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chi_tiet_san_pham` (
  `id_ctsp` int NOT NULL AUTO_INCREMENT,
  `ma_ctsp` varchar(255) DEFAULT NULL,
  `id_cl` int DEFAULT NULL,
  `id_ms` int DEFAULT NULL,
  `id_size` int DEFAULT NULL,
  `id_sp` int DEFAULT NULL,
  `is_lsp` int DEFAULT NULL,
  `id_xx` int DEFAULT NULL,
  `id_tay_ao` int DEFAULT NULL,
  `id_co_ao` int DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `so_luong_ton` int DEFAULT NULL,
  `gia_nhap` decimal(38,2) DEFAULT NULL,
  `gia_ban` decimal(38,2) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  `id_lsp` int DEFAULT NULL,
  PRIMARY KEY (`id_ctsp`),
  KEY `id_cl` (`id_cl`),
  KEY `id_size` (`id_size`),
  KEY `id_xx` (`id_xx`),
  KEY `id_lsp_idx` (`is_lsp`),
  KEY `id_ms_idx` (`id_ms`),
  KEY `id_sp_idx` (`id_sp`),
  KEY `id_tay_ao_idx` (`id_tay_ao`),
  KEY `id_co_ao_idx` (`id_co_ao`),
  CONSTRAINT `id_cl` FOREIGN KEY (`id_cl`) REFERENCES `chat_lieu` (`id_cl`),
  CONSTRAINT `id_co_ao` FOREIGN KEY (`id_co_ao`) REFERENCES `loai_co_ao` (`id_co_ao`),
  CONSTRAINT `id_lsp` FOREIGN KEY (`is_lsp`) REFERENCES `loai_sp` (`id_loaisp`),
  CONSTRAINT `id_ms` FOREIGN KEY (`id_ms`) REFERENCES `mau_sac` (`id_ms`),
  CONSTRAINT `id_size` FOREIGN KEY (`id_size`) REFERENCES `size` (`id_size`),
  CONSTRAINT `id_sp` FOREIGN KEY (`id_sp`) REFERENCES `san_pham` (`id_sp`),
  CONSTRAINT `id_tay_ao` FOREIGN KEY (`id_tay_ao`) REFERENCES `ong_tay_ao` (`id_tay_ao`),
  CONSTRAINT `id_xx` FOREIGN KEY (`id_xx`) REFERENCES `xuat_xu` (`id_xx`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_san_pham`
--

LOCK TABLES `chi_tiet_san_pham` WRITE;
/*!40000 ALTER TABLE `chi_tiet_san_pham` DISABLE KEYS */;
/*!40000 ALTER TABLE `chi_tiet_san_pham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chuc_vu`
--

DROP TABLE IF EXISTS `chuc_vu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chuc_vu` (
  `id_cv` int NOT NULL,
  `ma_cv` varchar(45) DEFAULT NULL,
  `ten_cv` varchar(45) DEFAULT NULL,
  `ngay_tao` date DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_cv`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chuc_vu`
--

LOCK TABLES `chuc_vu` WRITE;
/*!40000 ALTER TABLE `chuc_vu` DISABLE KEYS */;
/*!40000 ALTER TABLE `chuc_vu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dia_chi`
--

DROP TABLE IF EXISTS `dia_chi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dia_chi` (
<<<<<<< HEAD
  `id_dia_chi` int NOT NULL,
  `dia_chi_cu_the` varchar(255) DEFAULT NULL,
  `loai_dia_chi` int DEFAULT NULL,
  `phuong_xa` varchar(255) DEFAULT NULL,
  `quan_huyen` varchar(255) DEFAULT NULL,
  `sdt` varchar(255) DEFAULT NULL,
  `ten_nguoi_nhan` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(255) DEFAULT NULL,
=======
  `id_dia_chi` int NOT NULL AUTO_INCREMENT,
  `id_tk` int DEFAULT NULL,
  `dia_chi_cu_the` varchar(255) DEFAULT NULL,
  `phuong_xa` varchar(255) DEFAULT NULL,
  `quan_huyen` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(255) DEFAULT NULL,
  `loai_dia_chi` int DEFAULT NULL,
  `sdt` varchar(255) DEFAULT NULL,
  `ten_nguoi_nhan` varchar(255) DEFAULT NULL,
>>>>>>> c6b89cf1 (push-new)
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_dia_chi`),
  KEY `id_tai_khoan_idx` (`id_tk`),
  CONSTRAINT `id_tk` FOREIGN KEY (`id_tk`) REFERENCES `tai_khoan` (`id_tai_khoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dia_chi`
--

LOCK TABLES `dia_chi` WRITE;
/*!40000 ALTER TABLE `dia_chi` DISABLE KEYS */;
/*!40000 ALTER TABLE `dia_chi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giam_gia`
--

DROP TABLE IF EXISTS `giam_gia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giam_gia` (
  `id_giam_gia` int NOT NULL AUTO_INCREMENT,
  `ma_giam_gia` varchar(255) DEFAULT NULL,
  `ten_chuong_trinh` varchar(255) DEFAULT NULL,
  `ngay_bat_dau` date NOT NULL,
  `ngay_ket_thuc` date NOT NULL,
  `muc_giam_phan_tram` decimal(38,2) DEFAULT NULL,
  `muc_giam_tien_mat` decimal(38,2) DEFAULT NULL,
  `trang_thai` int DEFAULT '0',
  PRIMARY KEY (`id_giam_gia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giam_gia`
--

LOCK TABLES `giam_gia` WRITE;
/*!40000 ALTER TABLE `giam_gia` DISABLE KEYS */;
/*!40000 ALTER TABLE `giam_gia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giam_gia_chi_tiet`
--

DROP TABLE IF EXISTS `giam_gia_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giam_gia_chi_tiet` (
  `id_ggct` int NOT NULL,
  `id_ctsp` int DEFAULT NULL,
  `id_giam_gia` int DEFAULT NULL,
  `don_gia` decimal(38,2) DEFAULT NULL,
  `so_tien_con_lai` decimal(38,2) DEFAULT NULL,
<<<<<<< HEAD
  `trang_thai` int DEFAULT NULL,
=======
  `trang_thai` int NOT NULL,
>>>>>>> c6b89cf1 (push-new)
  PRIMARY KEY (`id_ggct`),
  KEY `FK786b8qqw28gx211g92jtf34ox` (`id_ctsp`),
  KEY `id_giam_gia_idx` (`id_giam_gia`),
<<<<<<< HEAD
  CONSTRAINT `id_ctsp` FOREIGN KEY (`id_ctsp`) REFERENCES `chi_tiet_san_pham` (`id_ctsp`),
=======
  CONSTRAINT `id_ctsp2` FOREIGN KEY (`id_ctsp`) REFERENCES `chi_tiet_san_pham` (`id_ctsp`),
>>>>>>> c6b89cf1 (push-new)
  CONSTRAINT `id_giam_gia` FOREIGN KEY (`id_giam_gia`) REFERENCES `giam_gia` (`id_giam_gia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giam_gia_chi_tiet`
--

LOCK TABLES `giam_gia_chi_tiet` WRITE;
/*!40000 ALTER TABLE `giam_gia_chi_tiet` DISABLE KEYS */;
/*!40000 ALTER TABLE `giam_gia_chi_tiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hinh_thuc_thanh_toan`
--

DROP TABLE IF EXISTS `hinh_thuc_thanh_toan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hinh_thuc_thanh_toan` (
  `id_httt` int NOT NULL AUTO_INCREMENT,
<<<<<<< HEAD
  `id_hd` int DEFAULT NULL,
=======
>>>>>>> c6b89cf1 (push-new)
  `hinh_thuc` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_httt`),
  KEY `id_hd_idx` (`id_hd`),
  CONSTRAINT `id_hd` FOREIGN KEY (`id_hd`) REFERENCES `hoa_don` (`id_hd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinh_thuc_thanh_toan`
--

LOCK TABLES `hinh_thuc_thanh_toan` WRITE;
/*!40000 ALTER TABLE `hinh_thuc_thanh_toan` DISABLE KEYS */;
/*!40000 ALTER TABLE `hinh_thuc_thanh_toan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don`
--

DROP TABLE IF EXISTS `hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don` (
  `id_hd` int NOT NULL,
  `id_tai_khoan` int DEFAULT NULL,
<<<<<<< HEAD
  `dia_chi` varchar(255) DEFAULT NULL,
  `ma_hd` varchar(255) DEFAULT NULL,
  `nga_bat_dau_giao` date DEFAULT NULL,
  `ngay_du_tinh_nhan` date DEFAULT NULL,
  `ngay_giao_thanh_cong` date DEFAULT NULL,
  `ngay_tao` date DEFAULT NULL,
  `ngay_thanh_toan` date DEFAULT NULL,
  `sdt_kh` varchar(255) DEFAULT NULL,
  `sdt_ship` varchar(255) DEFAULT NULL,
  `so_tien_giam_gia` decimal(38,2) DEFAULT NULL,
  `ten_kh` varchar(255) DEFAULT NULL,
  `ten_ship` varchar(255) DEFAULT NULL,
  `thanh_tien` decimal(38,2) DEFAULT NULL,
  `tien_dua` decimal(38,2) DEFAULT NULL,
  `tien_ship` decimal(38,2) DEFAULT NULL,
  `tien_thua` decimal(38,2) DEFAULT NULL,
  `tong_tien` decimal(38,2) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
=======
  `id_httt` int DEFAULT NULL,
  `ma_hd` varchar(255) DEFAULT NULL,
  `ngay_tao` date DEFAULT NULL,
  `ngay_thanh_toan` date DEFAULT NULL,
  `so_tien_giam_gia` decimal(38,2) DEFAULT NULL,
  `thanh_tien` decimal(38,2) DEFAULT NULL,
  `tien_dua` decimal(38,2) DEFAULT NULL,
  `tien_thua` decimal(38,2) DEFAULT NULL,
  `tien_ship` decimal(38,2) DEFAULT NULL,
  `tong_tien` decimal(38,2) DEFAULT NULL,
  `ten_kh` varchar(255) DEFAULT NULL,
  `sdt_kh` varchar(255) DEFAULT NULL,
  `ten_ship` varchar(255) DEFAULT NULL,
  `sdt_ship` varchar(255) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `ngay_du_tinh_nhan` date DEFAULT NULL,
  `nga_bat_dau_giao` date DEFAULT NULL,
  `ngay_giao_thanh_cong` date DEFAULT NULL,
  `trang_thai` int DEFAULT '0',
>>>>>>> c6b89cf1 (push-new)
  PRIMARY KEY (`id_hd`),
  KEY `id_tai_khoan` (`id_tai_khoan`),
  CONSTRAINT `id_tai_khoan` FOREIGN KEY (`id_tai_khoan`) REFERENCES `tai_khoan` (`id_tai_khoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don`
--

LOCK TABLES `hoa_don` WRITE;
/*!40000 ALTER TABLE `hoa_don` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don_chi_tiet`
--

DROP TABLE IF EXISTS `hoa_don_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don_chi_tiet` (
  `id_hdct` int NOT NULL,
  `id_ctsp` int DEFAULT NULL,
  `id_hd` int DEFAULT NULL,
  `don_gia` decimal(38,2) DEFAULT NULL,
  `ly_do_huy` varchar(255) DEFAULT NULL,
  `so_luong` int DEFAULT NULL,
<<<<<<< HEAD
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_hdct`),
  KEY `id_ctsp1_idx` (`id_ctsp`),
  KEY `id_hd1_idx` (`id_hd`),
  CONSTRAINT `id_ctsp1` FOREIGN KEY (`id_ctsp`) REFERENCES `chi_tiet_san_pham` (`id_ctsp`),
  CONSTRAINT `id_hd1` FOREIGN KEY (`id_hd`) REFERENCES `hoa_don` (`id_hd`)
=======
  `don_gia` decimal(38,2) DEFAULT NULL,
  `ly_do_huy` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT '0',
  `idHdct` int NOT NULL,
  PRIMARY KEY (`id_hdct`),
  KEY `id_hd_idx` (`id_hd`) /*!80000 INVISIBLE */,
  KEY `id_ctsp_idx` (`id_ctsp`),
  CONSTRAINT `id_ctsp1` FOREIGN KEY (`id_ctsp`) REFERENCES `chi_tiet_san_pham` (`id_ctsp`),
  CONSTRAINT `id_hd` FOREIGN KEY (`id_hd`) REFERENCES `hoa_don` (`id_hd`)
>>>>>>> c6b89cf1 (push-new)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don_chi_tiet`
--

LOCK TABLES `hoa_don_chi_tiet` WRITE;
/*!40000 ALTER TABLE `hoa_don_chi_tiet` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoa_don_chi_tiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id_images` int NOT NULL,
  `id_ctsp` int DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  `idImages` int NOT NULL,
  PRIMARY KEY (`id_images`),
  KEY `id_ctsp2` (`id_ctsp`),
  CONSTRAINT `id_ctsp2` FOREIGN KEY (`id_ctsp`) REFERENCES `chi_tiet_san_pham` (`id_ctsp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lich_su_giam_gia`
--

DROP TABLE IF EXISTS `lich_su_giam_gia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_su_giam_gia` (
  `id_lsgg` int NOT NULL,
  `id_hd` int DEFAULT NULL,
  `id_ggct` int DEFAULT NULL,
  `gia_ban_dau` varchar(255) DEFAULT NULL,
  `gia_da_giam` varchar(255) DEFAULT NULL,
  `ngay_mua` varchar(255) DEFAULT NULL,
<<<<<<< HEAD
  `trang_thai` int DEFAULT NULL,
=======
  `idLsgg` int NOT NULL,
>>>>>>> c6b89cf1 (push-new)
  PRIMARY KEY (`id_lsgg`),
  KEY `id_ggct` (`id_ggct`),
  KEY `id_hoa_don` (`id_hd`),
  CONSTRAINT `id_ggct` FOREIGN KEY (`id_ggct`) REFERENCES `giam_gia_chi_tiet` (`id_ggct`),
  CONSTRAINT `id_hoa_don` FOREIGN KEY (`id_hd`) REFERENCES `hoa_don` (`id_hd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_su_giam_gia`
--

LOCK TABLES `lich_su_giam_gia` WRITE;
/*!40000 ALTER TABLE `lich_su_giam_gia` DISABLE KEYS */;
/*!40000 ALTER TABLE `lich_su_giam_gia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loai_co_ao`
--

DROP TABLE IF EXISTS `loai_co_ao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loai_co_ao` (
  `id_co_ao` int NOT NULL AUTO_INCREMENT,
  `loai_co_ao` varchar(45) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_co_ao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai_co_ao`
--

LOCK TABLES `loai_co_ao` WRITE;
/*!40000 ALTER TABLE `loai_co_ao` DISABLE KEYS */;
/*!40000 ALTER TABLE `loai_co_ao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loai_sp`
--

DROP TABLE IF EXISTS `loai_sp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loai_sp` (
  `id_loaisp` int NOT NULL AUTO_INCREMENT,
  `ma_lsp` varchar(255) DEFAULT NULL,
  `ten_lsp` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  `id_lsp` int NOT NULL,
  PRIMARY KEY (`id_loaisp`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai_sp`
--

LOCK TABLES `loai_sp` WRITE;
/*!40000 ALTER TABLE `loai_sp` DISABLE KEYS */;
/*!40000 ALTER TABLE `loai_sp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mau_sac`
--

DROP TABLE IF EXISTS `mau_sac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mau_sac` (
  `id_ms` int NOT NULL AUTO_INCREMENT,
  `ma_ms` varchar(255) DEFAULT NULL,
  `ten_ms` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT '0',
  PRIMARY KEY (`id_ms`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mau_sac`
--

LOCK TABLES `mau_sac` WRITE;
/*!40000 ALTER TABLE `mau_sac` DISABLE KEYS */;
/*!40000 ALTER TABLE `mau_sac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ong_tay_ao`
--

DROP TABLE IF EXISTS `ong_tay_ao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ong_tay_ao` (
  `id_tay_ao` int NOT NULL AUTO_INCREMENT,
  `ma_tay_ao` varchar(255) DEFAULT NULL,
  `loai_tay_ao` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_tay_ao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ong_tay_ao`
--

LOCK TABLES `ong_tay_ao` WRITE;
/*!40000 ALTER TABLE `ong_tay_ao` DISABLE KEYS */;
/*!40000 ALTER TABLE `ong_tay_ao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `san_pham`
--

DROP TABLE IF EXISTS `san_pham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `san_pham` (
  `id_sp` int NOT NULL AUTO_INCREMENT,
  `ma_sp` varchar(255) DEFAULT NULL,
  `ten_sp` varchar(255) DEFAULT NULL,
  `tinh_trang` int NOT NULL,
  PRIMARY KEY (`id_sp`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `san_pham`
--

LOCK TABLES `san_pham` WRITE;
/*!40000 ALTER TABLE `san_pham` DISABLE KEYS */;
/*!40000 ALTER TABLE `san_pham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `id_size` int NOT NULL AUTO_INCREMENT,
  `ma_size` varchar(255) DEFAULT NULL,
  `ten_size` varchar(255) DEFAULT NULL,
  `tinh_trang` int DEFAULT '0',
  PRIMARY KEY (`id_size`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tai_khoan`
--

DROP TABLE IF EXISTS `tai_khoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tai_khoan` (
<<<<<<< HEAD
  `id_tai_khoan` int NOT NULL,
  `id_dia_chi` int DEFAULT NULL,
  `id_chuc_vu` int DEFAULT NULL,
  `chuc_vu` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `ho` varchar(255) DEFAULT NULL,
  `ma_tai_khoan` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `sdt` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_tai_khoan`),
  KEY `id_dia_chi` (`id_dia_chi`),
  KEY `id_chuc_vu_idx` (`id_chuc_vu`),
  CONSTRAINT `id_chuc_vu` FOREIGN KEY (`id_chuc_vu`) REFERENCES `chuc_vu` (`id_cv`),
  CONSTRAINT `id_dia_chi` FOREIGN KEY (`id_dia_chi`) REFERENCES `dia_chi` (`id_dia_chi`)
=======
  `id_tai_khoan` int NOT NULL AUTO_INCREMENT,
  `ma_tai_khoan` varchar(255) DEFAULT NULL,
  `ho` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  `sdt` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `chuc_vu` int DEFAULT '0',
  `quyen_vu` int DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_tai_khoan`)
>>>>>>> c6b89cf1 (push-new)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_khoan`
--

LOCK TABLES `tai_khoan` WRITE;
/*!40000 ALTER TABLE `tai_khoan` DISABLE KEYS */;
/*!40000 ALTER TABLE `tai_khoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xuat_xu`
--

DROP TABLE IF EXISTS `xuat_xu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `xuat_xu` (
  `id_xx` int NOT NULL AUTO_INCREMENT,
  `ma_xx` varchar(255) DEFAULT NULL,
  `ten_nuoc` varchar(255) DEFAULT NULL,
  `tinh_trang` int DEFAULT NULL,
  PRIMARY KEY (`id_xx`)
<<<<<<< HEAD
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
=======
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
>>>>>>> c6b89cf1 (push-new)
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xuat_xu`
--

LOCK TABLES `xuat_xu` WRITE;
/*!40000 ALTER TABLE `xuat_xu` DISABLE KEYS */;
<<<<<<< HEAD
INSERT INTO `xuat_xu` VALUES (17,'XX01','Y',0),(102,'XX02','Huhu',0),(104,'XX03 ','Huhu',0),(105,'XX04','Haa',0),(110,'rtgf','dgfdg',0);
=======
INSERT INTO `xuat_xu` VALUES (17,'XX01','Y',0),(102,'XX02','Huhu',0),(104,'XX03 ','Huhu',0),(105,'XX04','Haa',0),(108,'ewq','ewq',0);
>>>>>>> c6b89cf1 (push-new)
/*!40000 ALTER TABLE `xuat_xu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

<<<<<<< HEAD
-- Dump completed on 2023-07-04 22:54:45
=======
-- Dump completed on 2023-07-03 11:30:44
>>>>>>> c6b89cf1 (push-new)
