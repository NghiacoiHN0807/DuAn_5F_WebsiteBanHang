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
  `trang_thai` int DEFAULT '0',
  PRIMARY KEY (`id_cl`),
  UNIQUE KEY `MaCL` (`ma_cl`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_lieu`
--

LOCK TABLES `chat_lieu` WRITE;
/*!40000 ALTER TABLE `chat_lieu` DISABLE KEYS */;
INSERT INTO `chat_lieu` VALUES (11,'CL_01','Vai Tho',0),(12,'CL02','Vai Thuong',0),(13,'CL03','Vai Mem',0);
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
  `id_sp` int DEFAULT NULL,
  `id_size` int DEFAULT NULL,
  `id_ms` int DEFAULT NULL,
  `gia_nhap` decimal(38,2) DEFAULT NULL,
  `gia_ban` decimal(38,2) DEFAULT NULL,
  `gia_thuc_te` decimal(38,2) DEFAULT NULL,
  `so_luong_ton` int DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_ctsp`),
  KEY `id_sp_idx` (`id_sp`),
  KEY `id_size_idx` (`id_size`),
  KEY `id_ms_idx` (`id_ms`),
  CONSTRAINT `id_ms` FOREIGN KEY (`id_ms`) REFERENCES `mau_sac` (`id_ms`),
  CONSTRAINT `id_size` FOREIGN KEY (`id_size`) REFERENCES `size` (`id_size`),
  CONSTRAINT `id_sp` FOREIGN KEY (`id_sp`) REFERENCES `san_pham` (`id_sp`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_san_pham`
--

LOCK TABLES `chi_tiet_san_pham` WRITE;
/*!40000 ALTER TABLE `chi_tiet_san_pham` DISABLE KEYS */;
INSERT INTO `chi_tiet_san_pham` VALUES (14,5,5,4,500000.00,700000.00,700000.00,2619,0),(15,5,6,5,450000.00,580000.00,580000.00,289,0),(16,7,5,5,360000.00,566000.00,566000.00,9453,0),(17,6,7,4,780000.00,900000.00,900000.00,6822,0),(20,5,5,6,780000.00,780000.00,780000.00,765,0);
/*!40000 ALTER TABLE `chi_tiet_san_pham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chuc_vu`
--

DROP TABLE IF EXISTS `chuc_vu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chuc_vu` (
  `id_cv` int NOT NULL AUTO_INCREMENT,
  `ma_cv` varchar(45) DEFAULT NULL,
  `ten_cv` varchar(45) DEFAULT NULL,
  `ngay_tao` date DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_cv`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chuc_vu`
--

LOCK TABLES `chuc_vu` WRITE;
/*!40000 ALTER TABLE `chuc_vu` DISABLE KEYS */;
INSERT INTO `chuc_vu` VALUES (1,'CV01','Quản Lý','2023-07-23',0),(8,'CV02','Nhân Viên','2023-07-23',0),(9,'CV03','Khách Hàng','2023-07-23',0);
/*!40000 ALTER TABLE `chuc_vu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dia_chi`
--

DROP TABLE IF EXISTS `dia_chi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dia_chi` (
  `id_dia_chi` int NOT NULL AUTO_INCREMENT,
  `id_tai_khoan` int DEFAULT NULL,
  `loai_dia_chi` int DEFAULT NULL,
  `dia_chi_cu_the` varchar(255) DEFAULT NULL,
  `phuong_xa` varchar(255) DEFAULT NULL,
  `quan_huyen` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(255) DEFAULT NULL,
  `ten_nguoi_nhan` varchar(255) DEFAULT NULL,
  `sdt` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_dia_chi`),
  KEY `id_tai_khoan_id1x` (`id_tai_khoan`),
  CONSTRAINT `id_tai_khoan1` FOREIGN KEY (`id_tai_khoan`) REFERENCES `tai_khoan` (`id_tai_khoan`)
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
  `ngay_bat_dau` datetime NOT NULL,
  `ngay_ket_thuc` datetime NOT NULL,
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
  `id_ggct` int NOT NULL AUTO_INCREMENT,
  `id_sp` int DEFAULT NULL,
  `id_giam_gia` int DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_ggct`),
  KEY `id_giam_gia_idx` (`id_giam_gia`),
  KEY `id_sp2_idx` (`id_sp`),
  CONSTRAINT `id_giam_gia` FOREIGN KEY (`id_giam_gia`) REFERENCES `giam_gia` (`id_giam_gia`),
  CONSTRAINT `id_sp2` FOREIGN KEY (`id_sp`) REFERENCES `san_pham` (`id_sp`)
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
-- Table structure for table `gio_hang`
--

DROP TABLE IF EXISTS `gio_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gio_hang` (
  `id_gio_hang` int NOT NULL AUTO_INCREMENT,
  `id_kh` int DEFAULT NULL,
  `ma_gio_hang` varchar(45) DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `ten_nguoi_nhan` varchar(225) DEFAULT NULL,
  `dia_chi` varchar(225) DEFAULT NULL,
  `sdt` varchar(225) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_gio_hang`),
  KEY `id_kh_idx` (`id_kh`),
  CONSTRAINT `id_kh` FOREIGN KEY (`id_kh`) REFERENCES `tai_khoan` (`id_tai_khoan`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang`
--

LOCK TABLES `gio_hang` WRITE;
/*!40000 ALTER TABLE `gio_hang` DISABLE KEYS */;
INSERT INTO `gio_hang` VALUES (1,2,'GH01','2023-10-28 20:25:25',NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `gio_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gio_hang_chi_tiet`
--

DROP TABLE IF EXISTS `gio_hang_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gio_hang_chi_tiet` (
  `id_ghct` int NOT NULL AUTO_INCREMENT,
  `id_gh` int DEFAULT NULL,
  `id_ctsp` int DEFAULT NULL,
  `so_luong` int DEFAULT NULL,
  `don_gia` decimal(38,2) DEFAULT NULL,
  `don_gia_sau_giam` decimal(38,2) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_ghct`),
  KEY `id_ctsp_idx1` (`id_ctsp`),
  KEY `id_gh_idx` (`id_gh`),
  CONSTRAINT `id_ctsp1` FOREIGN KEY (`id_ctsp`) REFERENCES `chi_tiet_san_pham` (`id_ctsp`),
  CONSTRAINT `id_gh` FOREIGN KEY (`id_gh`) REFERENCES `gio_hang` (`id_gio_hang`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang_chi_tiet`
--

LOCK TABLES `gio_hang_chi_tiet` WRITE;
/*!40000 ALTER TABLE `gio_hang_chi_tiet` DISABLE KEYS */;
INSERT INTO `gio_hang_chi_tiet` VALUES (1,1,14,1,700000.00,700000.00,0);
/*!40000 ALTER TABLE `gio_hang_chi_tiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hinh_thuc_thanh_toan`
--

DROP TABLE IF EXISTS `hinh_thuc_thanh_toan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hinh_thuc_thanh_toan` (
  `id_httt` int NOT NULL AUTO_INCREMENT,
  `id_hd` int DEFAULT NULL,
  `so_tien` decimal(38,2) DEFAULT NULL,
  `hinh_thuc` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_httt`),
  KEY `id_hd2_idx` (`id_hd`),
  CONSTRAINT `id_hd2` FOREIGN KEY (`id_hd`) REFERENCES `hoa_don` (`id_hd`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinh_thuc_thanh_toan`
--

LOCK TABLES `hinh_thuc_thanh_toan` WRITE;
/*!40000 ALTER TABLE `hinh_thuc_thanh_toan` DISABLE KEYS */;
INSERT INTO `hinh_thuc_thanh_toan` VALUES (32,194,1560000.00,'Thanh Toán Online','Thanh Toán Online',0),(33,194,180000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0);
/*!40000 ALTER TABLE `hinh_thuc_thanh_toan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don`
--

DROP TABLE IF EXISTS `hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don` (
  `id_hd` int NOT NULL AUTO_INCREMENT,
  `id_tai_khoan` int DEFAULT NULL,
  `id_khach_hang` int DEFAULT NULL,
  `ma_hd` varchar(225) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `ngay_bat_dau_giao` date DEFAULT NULL,
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
  `kieu_hoa_don` int DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_hd`),
  KEY `id_tai_khoan_idx` (`id_tai_khoan`),
  KEY `id_khach_hang_idx` (`id_khach_hang`),
  CONSTRAINT `id_khach_hang` FOREIGN KEY (`id_khach_hang`) REFERENCES `tai_khoan` (`id_tai_khoan`),
  CONSTRAINT `id_tai_khoan` FOREIGN KEY (`id_tai_khoan`) REFERENCES `tai_khoan` (`id_tai_khoan`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don`
--

LOCK TABLES `hoa_don` WRITE;
/*!40000 ALTER TABLE `hoa_don` DISABLE KEYS */;
INSERT INTO `hoa_don` VALUES (194,NULL,1,'HD000001',NULL,NULL,NULL,NULL,'2023-10-26','2023-10-26',NULL,NULL,NULL,NULL,NULL,1740000.00,1740000.00,NULL,NULL,1740000.00,1,9),(195,NULL,NULL,'HD000002',NULL,NULL,NULL,NULL,'2023-10-26',NULL,NULL,NULL,NULL,NULL,NULL,616500.00,NULL,36500.00,NULL,580000.00,1,8),(196,5,4,'HD000003','Tỉnh Thái Nguyên, Huyện Đồng Hỷ, Xã Cây Thị, Số 3',NULL,NULL,NULL,'2023-10-26','2023-10-28','0378255978',NULL,NULL,'Nguyen Hoang B',NULL,3900000.00,NULL,NULL,NULL,3900000.00,2,0);
/*!40000 ALTER TABLE `hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don_chi_tiet`
--

DROP TABLE IF EXISTS `hoa_don_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don_chi_tiet` (
  `id_hdct` int NOT NULL AUTO_INCREMENT,
  `id_ctsp` int DEFAULT NULL,
  `id_hd` int DEFAULT NULL,
  `so_luong` int DEFAULT NULL,
  `don_gia` decimal(38,2) DEFAULT NULL,
  `ly_do_huy` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_hdct`),
  KEY `id_hd_idx` (`id_hd`),
  KEY `id_ctsp_idx` (`id_ctsp`),
  CONSTRAINT `id_ctsp` FOREIGN KEY (`id_ctsp`) REFERENCES `chi_tiet_san_pham` (`id_ctsp`),
  CONSTRAINT `id_hd` FOREIGN KEY (`id_hd`) REFERENCES `hoa_don` (`id_hd`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don_chi_tiet`
--

LOCK TABLES `hoa_don_chi_tiet` WRITE;
/*!40000 ALTER TABLE `hoa_don_chi_tiet` DISABLE KEYS */;
INSERT INTO `hoa_don_chi_tiet` VALUES (165,15,194,3,1740000.00,NULL,0),(166,15,195,1,580000.00,NULL,0),(170,17,196,1,900000.00,NULL,0),(171,15,196,5,2900000.00,NULL,0);
/*!40000 ALTER TABLE `hoa_don_chi_tiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id_images` int NOT NULL AUTO_INCREMENT,
  `id_sp` int DEFAULT NULL,
  `images` varchar(250) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_images`),
  KEY `id_sp_id1x` (`id_sp`),
  CONSTRAINT `id_sp1` FOREIGN KEY (`id_sp`) REFERENCES `san_pham` (`id_sp`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (7,6,'https://res.cloudinary.com/dqptpylda/image/upload/v1691813496/oobh4yxxuf1vwxuoamtt.jpg',0),(9,6,'https://res.cloudinary.com/dqptpylda/image/upload/v1691813591/abq6iic1suz9dmqq63zw.jpg',0),(10,5,'https://res.cloudinary.com/dqptpylda/image/upload/v1691813824/kwgazyerou8kh00ra2se.jpg',0),(11,7,'https://res.cloudinary.com/dqptpylda/image/upload/v1691813844/u2l4xroxo2zqibmwwwgb.jpg',0);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lich_su_giam_gia`
--

DROP TABLE IF EXISTS `lich_su_giam_gia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_su_giam_gia` (
  `id_lsgg` int NOT NULL AUTO_INCREMENT,
  `id_hd` int DEFAULT NULL,
  `id_ggct` int DEFAULT NULL,
  `gia_ban_dau` varchar(255) DEFAULT NULL,
  `gia_da_giam` varchar(255) DEFAULT NULL,
  `ngay_mua` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_lsgg`),
  KEY `id_hd1_idx` (`id_hd`),
  KEY `id_ggct_idx` (`id_ggct`),
  CONSTRAINT `id_ggct` FOREIGN KEY (`id_ggct`) REFERENCES `giam_gia_chi_tiet` (`id_ggct`),
  CONSTRAINT `id_hd1` FOREIGN KEY (`id_hd`) REFERENCES `hoa_don` (`id_hd`)
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
-- Table structure for table `lich_su_hoa_don`
--

DROP TABLE IF EXISTS `lich_su_hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_su_hoa_don` (
  `id_lshd` int NOT NULL AUTO_INCREMENT,
  `id_hd` int DEFAULT NULL,
  `id_tk` int DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  `mo_ta` varchar(225) DEFAULT NULL,
  `ngay_thay_doi` datetime DEFAULT NULL,
  PRIMARY KEY (`id_lshd`),
  KEY `id_hd_id2x` (`id_hd`),
  KEY `id_tk_idx` (`id_tk`),
  CONSTRAINT `id_hd3` FOREIGN KEY (`id_hd`) REFERENCES `hoa_don` (`id_hd`),
  CONSTRAINT `id_tk` FOREIGN KEY (`id_tk`) REFERENCES `tai_khoan` (`id_tai_khoan`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_su_hoa_don`
--

LOCK TABLES `lich_su_hoa_don` WRITE;
/*!40000 ALTER TABLE `lich_su_hoa_don` DISABLE KEYS */;
INSERT INTO `lich_su_hoa_don` VALUES (104,194,NULL,8,'Tạo Hóa Đơn Thành Công','2023-10-26 10:48:00'),(105,194,NULL,9,'Thanh Toán Thành Công','2023-10-26 10:55:19'),(106,195,NULL,8,'Tạo Hóa Đơn Thành Công','2023-10-26 16:10:51'),(107,196,NULL,8,'Tạo Hóa Đơn Thành Công','2023-10-26 16:56:37'),(111,196,5,0,'Tạo Đơn Hàng Ship Thành Công','2023-10-28 12:47:36'),(112,196,NULL,7,'Chỉnh sửa sản phẩm: Quan Lolicon','2023-10-28 19:29:20'),(113,196,NULL,7,'Chỉnh sửa sản phẩm: Ao Kakame','2023-10-28 19:30:21'),(114,196,NULL,7,'Xóa Sản Phẩm: Quan Lolicon','2023-10-28 20:19:30'),(115,196,NULL,7,'Xóa Sản Phẩm: Quan Lolicon','2023-10-28 20:20:49'),(116,196,NULL,7,'Xóa Sản Phẩm: Quan Lolicon','2023-10-28 20:20:52'),(117,196,NULL,7,'Chỉnh sửa sản phẩm: Quan Lolicon','2023-10-28 20:25:25');
/*!40000 ALTER TABLE `lich_su_hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loai_co_ao`
--

DROP TABLE IF EXISTS `loai_co_ao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loai_co_ao` (
  `id_co_ao` int NOT NULL AUTO_INCREMENT,
  `ma_co_ao` varchar(255) DEFAULT NULL,
  `loai_co_ao` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_co_ao`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai_co_ao`
--

LOCK TABLES `loai_co_ao` WRITE;
/*!40000 ALTER TABLE `loai_co_ao` DISABLE KEYS */;
INSERT INTO `loai_co_ao` VALUES (1,'CA01','Co ngan',0),(2,'CA02','Co dai',0);
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
  PRIMARY KEY (`id_loaisp`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai_sp`
--

LOCK TABLES `loai_sp` WRITE;
/*!40000 ALTER TABLE `loai_sp` DISABLE KEYS */;
INSERT INTO `loai_sp` VALUES (4,'LSP01','Tao Gym',0),(5,'LSP02','Chay Bo',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mau_sac`
--

LOCK TABLES `mau_sac` WRITE;
/*!40000 ALTER TABLE `mau_sac` DISABLE KEYS */;
INSERT INTO `mau_sac` VALUES (4,'MS01','Do',0),(5,'MS02','Xanh',0),(6,'MS03','Tim',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ong_tay_ao`
--

LOCK TABLES `ong_tay_ao` WRITE;
/*!40000 ALTER TABLE `ong_tay_ao` DISABLE KEYS */;
INSERT INTO `ong_tay_ao` VALUES (1,'TA01','Tay ao dai',0),(2,'TA02','Tay ao ngan',0);
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
  `id_cl` int DEFAULT NULL,
  `id_loaisp` int DEFAULT NULL,
  `id_xx` int DEFAULT NULL,
  `id_tay_ao` int DEFAULT NULL,
  `id_co_ao` int DEFAULT NULL,
  `mo_ta` varchar(225) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_sp`),
  KEY `id_cl_idx` (`id_cl`),
  KEY `id_loaisp_idx` (`id_loaisp`),
  KEY `id_tay_ao_idx` (`id_tay_ao`),
  KEY `id_xx_idx` (`id_xx`),
  KEY `id_co_ao_idx` (`id_co_ao`),
  CONSTRAINT `id_cl` FOREIGN KEY (`id_cl`) REFERENCES `chat_lieu` (`id_cl`),
  CONSTRAINT `id_co_ao` FOREIGN KEY (`id_co_ao`) REFERENCES `loai_co_ao` (`id_co_ao`),
  CONSTRAINT `id_loaisp` FOREIGN KEY (`id_loaisp`) REFERENCES `loai_sp` (`id_loaisp`),
  CONSTRAINT `id_tay_ao` FOREIGN KEY (`id_tay_ao`) REFERENCES `ong_tay_ao` (`id_tay_ao`),
  CONSTRAINT `id_xx` FOREIGN KEY (`id_xx`) REFERENCES `xuat_xu` (`id_xx`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `san_pham`
--

LOCK TABLES `san_pham` WRITE;
/*!40000 ALTER TABLE `san_pham` DISABLE KEYS */;
INSERT INTO `san_pham` VALUES (5,'SP01','Quan Lolicon',11,4,17,1,1,'Xau',0),(6,'SP02','Ao Kakame',12,5,102,2,2,'Moi',0),(7,'SP03','Quan Hoho',13,4,105,1,1,'Haha',0);
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
  `trang_thai` int DEFAULT '0',
  PRIMARY KEY (`id_size`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (5,'Size01','M',0),(6,'Size02','L',0),(7,'Size03','S',0);
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tai_khoan`
--

DROP TABLE IF EXISTS `tai_khoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tai_khoan` (
  `id_tai_khoan` int NOT NULL AUTO_INCREMENT,
  `id_chuc_vu` int DEFAULT NULL,
  `ma_tai_khoan` varchar(255) DEFAULT NULL,
  `ho` varchar(255) DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  `so_can_cuoc` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `sdt` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_tai_khoan`),
  KEY `id_chuc_vu_idx` (`id_chuc_vu`),
  CONSTRAINT `id_cv` FOREIGN KEY (`id_chuc_vu`) REFERENCES `chuc_vu` (`id_cv`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_khoan`
--

LOCK TABLES `tai_khoan` WRITE;
/*!40000 ALTER TABLE `tai_khoan` DISABLE KEYS */;
INSERT INTO `tai_khoan` VALUES (1,1,'TK01','Nguyen','Nghia',NULL,'nghiacoivipne@gmail.com','0337842655','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(2,8,'TK02','Nguyen','Van Hung',NULL,'nguyenvanhung@gmail.com','0578267849','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(3,9,'TK03','Hoang','Nam',NULL,'nguyenVanA@gmail.com','0578694258','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(4,9,'TK04','Nguyen','Huy Cuong',NULL,'nguyenVanB@gmail.com','0206070809','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(5,9,'TK05','Nguyen','Hoang Yen',NULL,'nguyenVanC@gmail.com','0708681458','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(6,9,'TK06','Ta','Dinh Nam',NULL,'nguyenVanD@gmail.com','0802147869','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(25,8,'TK007','ADV','Ha',NULL,'advha@gmail.com','0378268945','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0);
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
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_xx`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xuat_xu`
--

LOCK TABLES `xuat_xu` WRITE;
/*!40000 ALTER TABLE `xuat_xu` DISABLE KEYS */;
INSERT INTO `xuat_xu` VALUES (17,'XX01','Y',0),(102,'XX02','My',0),(104,'XX03 ','Huhu',0),(105,'XX04','Haa',0),(110,'rtgf','dgfdg',0);
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

-- Dump completed on 2023-11-17 17:23:54
