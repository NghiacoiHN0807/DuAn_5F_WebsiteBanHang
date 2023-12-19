CREATE DATABASE  IF NOT EXISTS `duan_5f` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `duan_5f`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: duan_5f
-- ------------------------------------------------------
-- Server version	8.0.33

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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_lieu`
--

LOCK TABLES `chat_lieu` WRITE;
/*!40000 ALTER TABLE `chat_lieu` DISABLE KEYS */;
INSERT INTO `chat_lieu` VALUES (11,'CL01','Vải Thô',0),(12,'CL02','Vải Thường',0),(13,'CL03','Vải Mềm',0),(14,'CL967F9464F','Vải Polyester',0),(15,'CL580C1B43A','Vải Cotton',0),(16,'CL1836CAD03','Vải Nylon',0),(17,'CLAE889BBAE','Vải Spandex',0),(18,'CLB7F989BDB','Vải Bamboo',0),(19,'CL3BCF88ECD','Vải Len',0),(20,'CLC9AB8828E','Vải X-Static',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_san_pham`
--

LOCK TABLES `chi_tiet_san_pham` WRITE;
/*!40000 ALTER TABLE `chi_tiet_san_pham` DISABLE KEYS */;
INSERT INTO `chi_tiet_san_pham` VALUES (14,5,5,4,500000.00,700000.00,665000.00,2617,0),(15,5,6,5,450000.00,580000.00,551000.00,289,0),(16,7,5,5,360000.00,566000.00,537700.00,9450,0),(17,6,7,4,780000.00,900000.00,900000.00,8,0),(20,5,5,6,780000.00,780000.00,741000.00,762,0),(21,9,6,5,150000.00,250000.00,237500.00,889,0),(22,9,5,6,60000.00,150000.00,142500.00,151,0),(23,10,6,5,158000.00,241000.00,228950.00,453,0),(24,10,5,5,60000.00,158000.00,150100.00,163,0),(25,11,6,5,89000.00,160000.00,160000.00,264,0),(26,11,7,4,85000.00,160000.00,160000.00,895,0),(27,12,7,12,120000.00,130000.00,130000.00,345,0),(28,13,9,5,150000.00,200000.00,200000.00,12,0),(29,14,8,12,170000.00,20000.00,20000.00,156,0),(30,15,7,10,145000.00,230000.00,230000.00,126,0),(31,16,8,10,150000.00,160000.00,160000.00,294,0),(32,17,8,8,17000.00,18000.00,18000.00,145,0),(33,18,8,10,150000.00,170000.00,170000.00,200,0),(34,19,8,10,300000.00,350000.00,350000.00,360,0),(35,20,8,10,134000.00,190000.00,190000.00,100,0),(36,21,5,10,170000.00,190000.00,190000.00,200,0),(37,22,6,4,170000.00,200000.00,200000.00,270,0),(38,23,8,5,700000.00,900000.00,900000.00,153,0),(39,24,8,12,450000.00,510000.00,510000.00,2000,0),(40,25,8,12,600000.00,70000.00,70000.00,231,0),(41,26,7,10,750000.00,800000.00,800000.00,120,0),(42,27,7,13,300000.00,400000.00,400000.00,345,0),(43,28,6,11,700000.00,800000.00,800000.00,300,0),(44,29,8,10,350000.00,500000.00,500000.00,134,0),(45,30,8,4,140000.00,180000.00,180000.00,200,0),(46,31,6,11,240000.00,260000.00,260000.00,123,0),(47,32,8,6,700000.00,780000.00,780000.00,456,0),(48,33,8,9,120000.00,150000.00,150000.00,221,0),(49,34,10,7,160000.00,180000.00,180000.00,233,0),(50,35,7,8,340000.00,450000.00,450000.00,321,0),(53,36,8,10,300000.00,45000.00,45000.00,234,0),(54,37,7,7,200000.00,270000.00,270000.00,300,0),(55,38,5,12,300000.00,400000.00,400000.00,211,0),(56,39,6,5,500000.00,600000.00,600000.00,300,0),(57,40,10,5,750000.00,800000.00,800000.00,290,0),(58,41,6,10,500000.00,600000.00,600000.00,232,0),(59,42,9,12,150000.00,180000.00,180000.00,450,0),(60,43,9,8,450000.00,470000.00,470000.00,343,0),(61,44,5,11,300000.00,320000.00,320000.00,122,0),(62,45,6,5,400000.00,430000.00,430000.00,333,0),(63,46,9,13,340000.00,380000.00,380000.00,433,0),(64,47,7,9,500000.00,530000.00,530000.00,133,0),(65,48,9,6,540000.00,570000.00,570000.00,342,0),(66,49,9,11,760000.00,800000.00,800000.00,222,0),(67,50,6,5,600000.00,700000.00,700000.00,222,0),(68,51,8,11,320000.00,430000.00,430000.00,3333,0),(69,52,7,9,230000.00,250000.00,250000.00,430,0),(70,53,8,11,430000.00,450000.00,450000.00,121,0),(71,54,8,11,324000.00,350000.00,350000.00,444,0),(72,55,6,12,320000.00,350000.00,350000.00,122,0),(73,56,6,12,440000.00,470000.00,470000.00,144,0),(74,57,10,8,340000.00,360000.00,360000.00,333,0),(75,58,8,5,230000.00,260000.00,260000.00,1211,0),(76,59,8,11,750000.00,800000.00,800000.00,320,0),(77,60,8,11,350000.00,410000.00,410000.00,222,0),(78,61,8,10,400000.00,500000.00,500000.00,1000,0),(79,62,7,7,430000.00,450000.00,450000.00,334,0),(80,63,8,10,540000.00,570000.00,570000.00,325,0),(81,64,8,12,356000.00,400000.00,400000.00,223,0),(82,65,9,5,670000.00,760000.00,760000.00,3422,0);
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
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hoa_don_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `thoi_gian_ket_thuc` datetime NOT NULL,
  `so_luong` int NOT NULL,
  `discount` decimal(38,2) DEFAULT NULL,
  `discount_percentage` int DEFAULT NULL,
  `max_discount` decimal(38,2) NOT NULL,
  `so_luong_hien_tai` int DEFAULT NULL,
  `thoi_gian_tao` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `thoi_gian_sua` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `trang_thai` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `pk_coupons_hoa_don` (`hoa_don_id`),
  CONSTRAINT `pk_coupons_hoa_don` FOREIGN KEY (`hoa_don_id`) REFERENCES `hoa_don` (`id_hd`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (6,NULL,'Vinh Loli','Lxp7G8WJ','Giảm giá siêu tốc','2023-12-21 21:30:14',7854,NULL,5,100000.00,7849,'2023-12-08 16:56:14.000','2023-12-18 13:19:47.728',0),(7,NULL,'Giảm Giá Mùa Đông','IltCvlV6','Giảm cực sốc','2023-12-20 12:00:00',17,NULL,10,500000.00,16,'2023-12-16 12:00:00.000','2023-12-18 13:18:28.344',0);
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
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
  `phi_ship` decimal(38,2) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_dia_chi`),
  KEY `id_tai_khoan_id1x` (`id_tai_khoan`),
  CONSTRAINT `id_tai_khoan1` FOREIGN KEY (`id_tai_khoan`) REFERENCES `tai_khoan` (`id_tai_khoan`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dia_chi`
--

LOCK TABLES `dia_chi` WRITE;
/*!40000 ALTER TABLE `dia_chi` DISABLE KEYS */;
INSERT INTO `dia_chi` VALUES (1,3,1,'21 Hoàng Bin','Phường Trung Văn','Quận Nam Từ Liêm','Hà Nội','Hoàng Nguyễn','0978587046',14000.00,0),(2,3,2,'23 Kim Hoàng','Xã Trung Sơn','Huyện Yên Lập','Phú Thọ','Hoàng Nam','0359782645',32000.00,0),(3,6,0,'Số 3 ','Phường Sông Đà','Thị xã Mường Lay','Điện Biên','Hoàng Nam','0978564757',36500.00,0),(4,5,0,'Số 45','Xã Hòa Minh','Huyện Tuy Phong','Bình Thuận','Hoàng Yến','0978659043',44000.00,0),(5,5,0,'Số 7','Xã Hòa Minh','Huyện Tuy Phong','Bình Thuận','Hoang Oanh','0965894323',44000.00,0),(6,4,0,'Số 89','Xã Diên Bình','Huyện Đắk Tô','Kon Tum','Hoàng Nam','0978549043',44000.00,0),(7,1,0,'123','Xã Nậm Xe','Huyện Phong Thổ','Lai Châu','Nguyễn Trọng Nghĩa','0987654733',36500.00,0),(8,1,0,'Số 3','Xã Sơn Hà','Huyện Sơn Hòa','Phú Yên','Vân','0987408506',44000.00,0),(9,3,0,'15 Hàng Kim','Xã Nậm Pì','Huyện Nậm Nhùn','Lai Châu','Long','0987654367',36500.00,0),(10,3,0,'15 Ha','Xã Hòa Tâm','Thị xã Đông Hòa','Phú Yên','Vy','0979563412',44000.00,0),(11,26,0,'14 Binh Boe','Xã Nghĩa Lợi','Thị xã Nghĩa Lộ','Yên Bái','Nghia','0987659843',36500.00,0),(12,26,0,'35 Trung Kinh','Xã Hồng Phong','Huyện Bắc Bình','Bình Thuận','Nghia','0987564309',44000.00,0),(13,26,0,'76 Huy Hoàng','Xã Lợi Hải','Huyện Thuận Bắc','Ninh Thuận','Trong Nghia','0965783290',34000.00,0),(14,26,0,'86 Huynh Quy','Xã Hương Ngải','Huyện Thạch Thất','Hà Nội','Nghia','0978549023',29000.00,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giam_gia`
--

LOCK TABLES `giam_gia` WRITE;
/*!40000 ALTER TABLE `giam_gia` DISABLE KEYS */;
INSERT INTO `giam_gia` VALUES (1,'JRKDL','Giảm Giá Mùa Đông','2023-12-15 12:00:00','2023-12-21 17:00:00',5.00,NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giam_gia_chi_tiet`
--

LOCK TABLES `giam_gia_chi_tiet` WRITE;
/*!40000 ALTER TABLE `giam_gia_chi_tiet` DISABLE KEYS */;
INSERT INTO `giam_gia_chi_tiet` VALUES (1,7,1,0),(2,9,1,0),(3,5,1,0),(4,10,1,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang`
--

LOCK TABLES `gio_hang` WRITE;
/*!40000 ALTER TABLE `gio_hang` DISABLE KEYS */;
INSERT INTO `gio_hang` VALUES (1,3,'GH01','2023-10-28 20:25:25',NULL,NULL,NULL,0),(2,26,'GHB7C5897CB','2023-12-16 00:08:23',NULL,NULL,NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang_chi_tiet`
--

LOCK TABLES `gio_hang_chi_tiet` WRITE;
/*!40000 ALTER TABLE `gio_hang_chi_tiet` DISABLE KEYS */;
INSERT INTO `gio_hang_chi_tiet` VALUES (44,1,16,15,8065500.00,8065500.00,0),(53,2,14,1,665000.00,665000.00,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinh_thuc_thanh_toan`
--

LOCK TABLES `hinh_thuc_thanh_toan` WRITE;
/*!40000 ALTER TABLE `hinh_thuc_thanh_toan` DISABLE KEYS */;
INSERT INTO `hinh_thuc_thanh_toan` VALUES (32,194,1560000.00,'Thanh Toán Online','Thanh Toán Online',0),(33,194,180000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(37,196,3900000.00,'Thanh Toán Online','Thanh Toán Online',0),(38,199,2714000.00,'Thanh Toán Online','Thanh Toán Online',0),(39,195,5220000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(40,212,1066000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(41,213,1950000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(42,214,1848000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(43,215,1698000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(44,216,1698000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(45,217,1698000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(46,218,3050000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(47,226,2714000.00,'Thanh Toán Online','Thanh Toán Online',0),(48,232,1550000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(49,244,565000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(51,261,274000.00,'Thanh Toán Online','Thanh Toán Online',0),(52,263,1854000.00,'Thanh Toán Online','Thanh Toán Online',0),(53,263,183500.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(54,306,558125.00,'Thanh Toán Online','Thanh Toán Online',0);
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
  `ngay_bat_dau_giao` datetime DEFAULT NULL,
  `ngay_du_tinh_nhan` datetime DEFAULT NULL,
  `ngay_giao_thanh_cong` datetime DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `ngay_thanh_toan` datetime DEFAULT NULL,
  `email` varchar(225) DEFAULT NULL,
  `sdt_kh` varchar(255) DEFAULT NULL,
  `sdt_ship` varchar(255) DEFAULT NULL,
  `ma_giam_gia` varchar(45) DEFAULT NULL,
  `so_tien_giam_gia` decimal(38,2) DEFAULT NULL,
  `ten_kh` varchar(255) DEFAULT NULL,
  `ten_ship` varchar(255) DEFAULT NULL,
  `tien_dua` decimal(38,2) DEFAULT '0.00',
  `tien_ship` decimal(38,2) DEFAULT '0.00',
  `tien_thua` decimal(38,2) DEFAULT '0.00',
  `tong_tien` decimal(38,2) DEFAULT '0.00',
  `thanh_tien` decimal(38,2) DEFAULT '0.00',
  `kieu_hoa_don` int DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_hd`),
  KEY `id_tai_khoan_idx` (`id_tai_khoan`),
  KEY `id_khach_hang_idx` (`id_khach_hang`),
  CONSTRAINT `id_khach_hang` FOREIGN KEY (`id_khach_hang`) REFERENCES `tai_khoan` (`id_tai_khoan`),
  CONSTRAINT `id_tai_khoan` FOREIGN KEY (`id_tai_khoan`) REFERENCES `tai_khoan` (`id_tai_khoan`)
) ENGINE=InnoDB AUTO_INCREMENT=307 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don`
--

LOCK TABLES `hoa_don` WRITE;
/*!40000 ALTER TABLE `hoa_don` DISABLE KEYS */;
INSERT INTO `hoa_don` VALUES (194,NULL,1,'HD000001',NULL,NULL,NULL,NULL,'2023-10-26 00:00:00','2023-10-26 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1740000.00,NULL,NULL,1740000.00,1740000.00,1,9),(195,NULL,NULL,'HD000002',NULL,NULL,NULL,NULL,'2023-10-26 00:00:00','2023-12-10 07:00:00',NULL,'0978435632',NULL,NULL,NULL,'Nguyen Van Yen',NULL,5220000.00,0.00,0.00,5220000.00,5220000.00,1,3),(196,5,4,'HD000003','Tỉnh Thái Nguyên, Huyện Đồng Hỷ, Xã Cây Thị, Số 3',NULL,NULL,NULL,'2023-10-26 00:00:00','2023-12-01 00:00:00',NULL,'0378255978',NULL,NULL,NULL,'Nguyen Hoang B',NULL,3900000.00,NULL,NULL,3900000.00,3900000.00,2,4),(197,NULL,3,'HD000004','21 Hoàng Bin, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội',NULL,NULL,NULL,'2023-11-27 15:25:56',NULL,NULL,'0578694258',NULL,NULL,0.00,'Hoàng Nguyễn',NULL,NULL,14000.00,NULL,2960000.00,2974000.00,2,1),(199,NULL,3,'HD000005','21 Hoàng Bin, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội',NULL,NULL,NULL,'2023-12-01 21:40:22','2023-12-01 00:00:00',NULL,'0578694258',NULL,NULL,NULL,'Hoàng Nguyễn',NULL,2714000.00,14000.00,NULL,2700000.00,2714000.00,2,5),(200,NULL,3,'HD000006','15 Hàng Kim, Xã Nậm Pì, Huyện Nậm Nhùn, Lai Châu',NULL,NULL,NULL,'2023-12-04 11:42:23',NULL,'nguyenVanA@gmail.com','0987654367',NULL,NULL,0.00,'Long',NULL,NULL,36500.00,NULL,150000.00,186500.00,2,0),(201,NULL,3,'HD000007','23 Kim Hoàng, Xã Trung Sơn, Huyện Yên Lập, Phú Thọ',NULL,NULL,NULL,'2023-12-04 11:42:23',NULL,NULL,'0359782645',NULL,NULL,NULL,'Hoàng Nam',NULL,NULL,32000.00,NULL,1132000.00,1164000.00,2,0),(202,NULL,3,'HD000008','21 Hoàng Bin, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội',NULL,NULL,NULL,'2023-12-04 11:42:23',NULL,NULL,'0578694258',NULL,NULL,0.00,'Hoàng Nguyễn',NULL,NULL,14000.00,NULL,4212000.00,4226000.00,2,0),(203,NULL,3,'HD000009','21 Hoàng Bin, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội',NULL,NULL,NULL,'2023-12-04 11:42:23',NULL,NULL,'0578694258',NULL,NULL,NULL,'Hoàng Nguyễn',NULL,NULL,14000.00,NULL,1740000.00,1754000.00,2,10),(204,NULL,3,'HD000010','23 Kim Hoàng, Xã Trung Sơn, Huyện Yên Lập, Phú Thọ',NULL,NULL,NULL,'2023-12-04 11:42:23',NULL,'nguyenVanA@gmail.com','0359782645',NULL,NULL,NULL,'Hoàng Nam',NULL,NULL,32000.00,NULL,1560000.00,1592000.00,2,0),(205,NULL,3,'HD000011','21 Hoàng Bin, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội',NULL,NULL,NULL,'2023-12-04 11:42:23',NULL,NULL,'0578694258',NULL,NULL,NULL,'Hoàng Nguyễn',NULL,NULL,14000.00,NULL,1160000.00,1174000.00,2,1),(206,NULL,NULL,'HD000012',NULL,NULL,NULL,NULL,'2023-12-06 15:50:35',NULL,NULL,NULL,NULL,NULL,0.00,NULL,NULL,NULL,0.00,NULL,475000.00,475000.00,1,8),(212,NULL,NULL,'HD000018',NULL,NULL,NULL,NULL,'2023-12-10 17:30:49','2023-12-10 07:00:00',NULL,'0978567845',NULL,NULL,NULL,'Nguyen Thi Ha',NULL,1066000.00,0.00,0.00,1066000.00,1066000.00,1,9),(213,NULL,NULL,'HD000019',NULL,NULL,NULL,NULL,'2023-12-10 18:26:42','2023-12-10 07:00:00',NULL,'',NULL,NULL,NULL,'',NULL,1950000.00,0.00,0.00,1950000.00,1950000.00,1,9),(214,NULL,NULL,'HD000020',NULL,NULL,NULL,NULL,'2023-12-10 18:36:55','2023-12-10 07:00:00',NULL,'',NULL,NULL,NULL,'',NULL,1848000.00,0.00,0.00,1848000.00,1848000.00,1,9),(215,NULL,NULL,'HD000021',NULL,NULL,NULL,NULL,'2023-12-10 18:42:47','2023-12-10 07:00:00',NULL,'',NULL,NULL,NULL,'',NULL,1698000.00,0.00,0.00,1698000.00,1698000.00,1,9),(216,NULL,NULL,'HD000022',NULL,NULL,NULL,NULL,'2023-12-10 18:52:45','2023-12-10 07:00:00',NULL,'',NULL,NULL,NULL,'',NULL,1698000.00,0.00,0.00,1698000.00,1698000.00,1,9),(217,NULL,NULL,'HD000023',NULL,NULL,NULL,NULL,'2023-12-10 18:56:25','2023-12-10 07:00:00',NULL,'',NULL,NULL,NULL,'',NULL,1698000.00,0.00,0.00,1698000.00,1698000.00,1,9),(218,NULL,NULL,'HD000024',NULL,NULL,NULL,NULL,'2023-12-10 18:56:25','2023-12-10 07:00:00',NULL,'',NULL,NULL,NULL,'',NULL,3050000.00,0.00,0.00,3050000.00,3050000.00,1,9),(219,NULL,3,'HD000025','23 Kim Hoàng, Xã Trung Sơn, Huyện Yên Lập, Phú Thọ',NULL,NULL,NULL,'2023-12-10 21:52:37','2023-12-12 07:00:00',NULL,'0359782645',NULL,NULL,0.00,'Hoàng Nam',NULL,NULL,32000.00,NULL,3646000.00,3678000.00,2,0),(222,NULL,3,'HD000027','21 Hoàng Bin, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội',NULL,NULL,NULL,'2023-12-11 12:10:20',NULL,NULL,'0578694258',NULL,NULL,0.00,'Hoàng Nguyễn',NULL,NULL,14000.00,NULL,2366000.00,2380000.00,2,0),(224,NULL,3,'HD000029','23 Kim Hoàng, Xã Trung Sơn, Huyện Yên Lập, Phú Thọ',NULL,NULL,NULL,'2023-12-11 12:12:58',NULL,NULL,'0359782645',NULL,NULL,0.00,'Hoàng Nam',NULL,NULL,32000.00,NULL,7766000.00,7798000.00,2,0),(226,NULL,3,'HD000031','21 Hoàng Bin, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội',NULL,NULL,NULL,'2023-12-11 12:12:58','2023-12-11 12:12:58',NULL,'0578694258',NULL,NULL,0.00,'Hoàng Nguyễn',NULL,2714000.00,14000.00,NULL,2700000.00,2714000.00,2,6),(227,NULL,NULL,'HD000032','Hà Nội, Huyện Thường Tín, Xã Thư Phú, Số 1',NULL,NULL,NULL,'2023-12-11 21:24:30',NULL,'hoadepgai@gmail.com','0978569043',NULL,NULL,0.00,'Nguyen Hoa',NULL,NULL,29000.00,NULL,1800000.00,1829000.00,2,10),(228,NULL,NULL,'HD000033',NULL,NULL,NULL,NULL,'2023-12-12 16:52:36',NULL,NULL,NULL,NULL,NULL,0.00,NULL,NULL,NULL,0.00,NULL,0.00,0.00,1,10),(229,NULL,6,'HD000034','Số 3 , Phường Sông Đà, Thị xã Mường Lay, Điện Biên',NULL,NULL,NULL,'2023-12-12 16:52:36','2023-12-16 00:01:47','nguyenVanD@gmail.com','0978564757',NULL,NULL,0.00,'Hoàng Nam',NULL,NULL,36500.00,NULL,537700.00,574200.00,2,0),(230,NULL,NULL,'HD000035','Bình Thuận, Huyện đảo Phú Quý, Xã Ngũ Phụng, HIHI',NULL,NULL,NULL,'2023-12-12 16:59:06','2023-12-15 23:11:48','huynl@gmail.com','0978543248',NULL,NULL,0.00,' Huy NL',NULL,NULL,44000.00,NULL,807500.00,851500.00,2,0),(231,NULL,NULL,'HD000036',NULL,NULL,NULL,NULL,'2023-12-12 16:59:06',NULL,NULL,NULL,NULL,NULL,0.00,NULL,NULL,NULL,0.00,NULL,0.00,0.00,1,10),(232,NULL,NULL,'HD000037',NULL,NULL,NULL,NULL,'2023-12-12 16:59:06','2023-12-15 07:00:00',NULL,'',NULL,NULL,0.00,'',NULL,NULL,0.00,NULL,1550000.00,1550000.00,1,9),(244,NULL,3,'HD000041','21 Hoàng Bin, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội',NULL,NULL,NULL,'2023-12-15 23:11:48','2023-12-16 07:00:00',NULL,'0978587046',NULL,NULL,0.00,'Hoàng Nguyễn',NULL,565000.00,14000.00,0.00,551000.00,565000.00,2,4),(247,NULL,3,'HD000044','21 Hoàng Bin, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội',NULL,NULL,NULL,'2023-12-16 00:01:47',NULL,'nguyenVanA@gmail.com','0978587046',NULL,NULL,0.00,'Hoàng Nguyễn',NULL,NULL,14000.00,NULL,665000.00,679000.00,2,0),(248,NULL,5,'HD000045',NULL,NULL,NULL,NULL,'2023-12-16 09:33:44',NULL,NULL,NULL,NULL,NULL,0.00,NULL,NULL,NULL,0.00,NULL,2150800.00,2150800.00,1,8),(249,NULL,NULL,'HD000046',NULL,NULL,NULL,NULL,'2023-12-16 09:33:44',NULL,NULL,NULL,NULL,NULL,0.00,NULL,NULL,NULL,0.00,NULL,0.00,0.00,1,8),(250,NULL,3,'HD000047',NULL,NULL,NULL,NULL,'2023-12-16 09:33:44',NULL,NULL,NULL,NULL,NULL,0.00,NULL,NULL,NULL,0.00,NULL,537700.00,537700.00,1,8),(252,NULL,NULL,'HD000048',NULL,NULL,NULL,NULL,'2023-12-16 11:13:21',NULL,NULL,NULL,NULL,NULL,0.00,NULL,NULL,NULL,0.00,NULL,9000000.00,9000000.00,1,8),(253,NULL,NULL,'HD000049','Bình Định, Huyện Phù Mỹ, Xã Mỹ Lộc, Số 3',NULL,NULL,NULL,'2023-12-16 14:25:47',NULL,'nguyenne@gmail.com','0978549032',NULL,NULL,0.00,'HuyTrinh',NULL,NULL,44000.00,NULL,537700.00,581700.00,2,0),(254,NULL,3,'HD000050','21 Hoàng Bin, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội',NULL,NULL,NULL,'2023-12-16 14:25:47',NULL,'nguyenVanA@gmail.com','0978587046',NULL,NULL,0.00,'Hoàng Nguyễn',NULL,NULL,14000.00,NULL,8100000.00,8114000.00,2,0),(255,NULL,NULL,'HD000051','Yên Bái, Thị xã Nghĩa Lộ, Xã Nghĩa Lộ, HI',NULL,NULL,NULL,'2023-12-16 14:25:47',NULL,'khiwuyr@gmail.com','0954784323',NULL,NULL,0.00,'  ',NULL,NULL,36500.00,NULL,537700.00,574200.00,2,0),(258,NULL,26,'HD000052','76 Huy Hoàng, Xã Lợi Hải, Huyện Thuận Bắc, Ninh Thuận',NULL,NULL,NULL,'2023-12-16 14:25:47',NULL,'ytbcointn@gmail.com','0965783290',NULL,NULL,0.00,'Trong Nghia',NULL,NULL,34000.00,NULL,237500.00,271500.00,2,0),(261,NULL,26,'HD000054','14 Binh Boe, Xã Nghĩa Lợi, Thị xã Nghĩa Lộ, Yên Bái',NULL,NULL,NULL,'2023-12-16 14:25:47','2023-12-16 14:25:47','ytbcointn@gmail.com','0987659843',NULL,NULL,0.00,'Nghia',NULL,274000.00,36500.00,NULL,237500.00,274000.00,2,0),(263,NULL,26,'HD000056','14 Binh Boe, Xã Nghĩa Lợi, Thị xã Nghĩa Lộ, Yên Bái',NULL,NULL,NULL,'2023-12-16 18:04:06','2023-12-17 10:43:34','ytbcointn@gmail.com','0987659843',NULL,NULL,0.00,'Nghia',NULL,1854000.00,36500.00,NULL,2037500.00,2074000.00,2,5),(264,NULL,26,'HD000057','14 Binh Boe, Xã Nghĩa Lợi, Thị xã Nghĩa Lộ, Yên Bái',NULL,NULL,NULL,'2023-12-16 18:04:06',NULL,'ytbcointn@gmail.com','0987659843',NULL,NULL,0.00,'Nghia',NULL,NULL,36500.00,NULL,667700.00,704200.00,2,10),(305,NULL,26,'HD000058','14 Binh Boe, Xã Nghĩa Lợi, Thị xã Nghĩa Lộ, Yên Bái',NULL,NULL,NULL,'2023-12-18 11:31:58',NULL,'ytbcointn@gmail.com','0987659843',NULL,'IltCvlV6',72335.00,'Nghia',NULL,NULL,36500.00,NULL,686850.00,651015.00,2,0),(306,NULL,26,'HD000059','14 Binh Boe, Xã Nghĩa Lợi, Thị xã Nghĩa Lộ, Yên Bái',NULL,NULL,NULL,'2023-12-18 11:31:58','2023-12-18 11:31:58','ytbcointn@gmail.com','0987659843',NULL,'Lxp7G8WJ',29375.00,'Nghia',NULL,558125.00,36500.00,NULL,551000.00,558125.00,2,5);
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
) ENGINE=InnoDB AUTO_INCREMENT=386 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don_chi_tiet`
--

LOCK TABLES `hoa_don_chi_tiet` WRITE;
/*!40000 ALTER TABLE `hoa_don_chi_tiet` DISABLE KEYS */;
INSERT INTO `hoa_don_chi_tiet` VALUES (165,15,194,3,1740000.00,NULL,0),(166,15,195,9,5220000.00,NULL,0),(170,17,196,1,900000.00,NULL,0),(171,15,196,5,2900000.00,NULL,0),(175,17,199,3,2700000.00,NULL,0),(177,16,201,4,2264000.00,NULL,0),(178,16,202,7,3962000.00,NULL,0),(179,15,203,3,1740000.00,NULL,0),(180,20,204,2,1560000.00,NULL,0),(181,20,205,3,2340000.00,NULL,0),(190,17,197,2,1800000.00,'',0),(195,15,197,2,1160000.00,'',0),(196,15,197,7,580000.00,'Ko uwng',10),(200,21,206,2,475000.00,NULL,0),(207,16,212,1,566000.00,NULL,0),(208,21,212,2,500000.00,NULL,0),(209,17,213,2,1800000.00,NULL,0),(210,22,213,1,150000.00,NULL,0),(212,22,214,1,150000.00,NULL,0),(215,16,214,3,1698000.00,NULL,0),(216,16,215,3,1698000.00,NULL,0),(217,16,216,3,1698000.00,NULL,0),(218,16,217,3,1698000.00,NULL,0),(219,21,218,5,1250000.00,NULL,0),(220,17,218,2,1800000.00,NULL,0),(221,16,219,6,3396000.00,NULL,0),(226,17,222,2,1800000.00,NULL,0),(228,38,224,8,7200000.00,NULL,0),(230,38,226,3,2700000.00,NULL,0),(231,17,227,2,1800000.00,NULL,0),(232,21,219,1,250000.00,NULL,0),(272,14,232,2,1400000.00,NULL,0),(274,16,222,1,566000.00,NULL,0),(276,21,202,1,250000.00,NULL,0),(277,16,224,1,566000.00,NULL,0),(278,22,232,1,150000.00,NULL,0),(280,22,200,1,150000.00,NULL,0),(292,22,230,4,570000.00,NULL,0),(296,21,230,1,237500.00,NULL,0),(302,15,244,1,551000.00,NULL,0),(305,14,247,1,665000.00,NULL,0),(306,16,229,1,537700.00,NULL,0),(307,16,250,1,537700.00,NULL,0),(308,16,248,4,2150800.00,NULL,0),(312,17,252,10,9000000.00,NULL,0),(315,16,253,1,537700.00,NULL,0),(316,17,254,9,8100000.00,NULL,0),(317,16,255,1,537700.00,NULL,0),(320,21,258,1,237500.00,NULL,0),(323,21,261,1,237500.00,NULL,0),(325,17,263,2,1800000.00,NULL,0),(326,21,263,1,237500.00,NULL,0),(327,27,264,1,130000.00,NULL,0),(328,16,264,1,537700.00,NULL,0),(384,23,305,3,686850.00,NULL,0),(385,15,306,1,551000.00,NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (7,6,'https://res.cloudinary.com/dqptpylda/image/upload/v1691813496/oobh4yxxuf1vwxuoamtt.jpg',0),(11,7,'https://res.cloudinary.com/dqptpylda/image/upload/v1691813844/u2l4xroxo2zqibmwwwgb.jpg',0),(12,9,'https://res.cloudinary.com/dqptpylda/image/upload/v1701853276/j5-7f/y6h69xtbym5rs7h7qrs5.jpg',0),(13,10,'https://res.cloudinary.com/dqptpylda/image/upload/v1701853462/j5-7f/idppz6mcaawwvwuovnnz.jpg',0),(14,11,'https://res.cloudinary.com/dqptpylda/image/upload/v1701853607/j5-7f/atynh3xx1lmn9w8jpkio.jpg',0),(15,12,'https://res.cloudinary.com/dqptpylda/image/upload/v1701972337/j5-7f/cumkqywh3smqpzxypygb.jpg',0),(16,13,'https://res.cloudinary.com/dqptpylda/image/upload/v1701972462/j5-7f/hduxnggwyzejczuabvbl.jpg',0),(17,14,'https://res.cloudinary.com/dqptpylda/image/upload/v1701972563/j5-7f/zong6acpzyrthyzdf8ws.jpg',0),(18,15,'https://res.cloudinary.com/dqptpylda/image/upload/v1701996272/j5-7f/ipqxyx3xlbwhwnwgd2u3.jpg',0),(20,16,'https://res.cloudinary.com/dqptpylda/image/upload/v1701998603/j5-7f/nrrczozi5s22zdb09p01.jpg',0),(21,5,'https://res.cloudinary.com/dqptpylda/image/upload/v1701999314/j5-7f/gxay3hvpqnbcjhnow94y.jpg',0),(22,17,'https://res.cloudinary.com/dqptpylda/image/upload/v1701999628/j5-7f/ip3ysmqnpbivi10jpeim.jpg',0),(23,18,'https://res.cloudinary.com/dqptpylda/image/upload/v1701999749/j5-7f/gy5a3rjvxbjxhc9fg3dh.jpg',0),(24,19,'https://res.cloudinary.com/dqptpylda/image/upload/v1702000007/j5-7f/gvppefelowv3vsfzd4jt.jpg',0),(25,20,'https://res.cloudinary.com/dqptpylda/image/upload/v1702000096/j5-7f/c0ndmsk3tjiuemyxhfjz.jpg',0),(26,21,'https://res.cloudinary.com/dqptpylda/image/upload/v1702000234/j5-7f/youdvpfeiwqkdqct4hpe.jpg',0),(27,22,'https://res.cloudinary.com/dqptpylda/image/upload/v1702000438/j5-7f/mc9mc9zgsytk6zcxtoyq.jpg',0),(28,23,'https://res.cloudinary.com/dqptpylda/image/upload/v1702000553/j5-7f/lmjkknwfmkcv9oixs57l.jpg',0),(29,24,'https://res.cloudinary.com/dqptpylda/image/upload/v1702000700/j5-7f/lywshk6fgpx9fj9suxhr.jpg',0),(30,25,'https://res.cloudinary.com/dqptpylda/image/upload/v1702000787/j5-7f/bj1ohqbdpw3vlat6nmro.jpg',0),(31,26,'https://res.cloudinary.com/dqptpylda/image/upload/v1702000882/j5-7f/tgv47qg3yn44o0vli44j.jpg',0),(32,27,'https://res.cloudinary.com/dqptpylda/image/upload/v1702000992/j5-7f/p7eu5hfwmlbusmmjjmjp.jpg',0),(33,28,'https://res.cloudinary.com/dqptpylda/image/upload/v1702001093/j5-7f/gnfzkhftfvodsxfb7qbf.jpg',0),(34,29,'https://res.cloudinary.com/dqptpylda/image/upload/v1702001208/j5-7f/ndlponm5bk5yhd0pxkaj.jpg',0),(35,30,'https://res.cloudinary.com/dqptpylda/image/upload/v1702001299/j5-7f/oa1ph3pmdrmam2y5do4o.jpg',0),(36,31,'https://res.cloudinary.com/dqptpylda/image/upload/v1702001387/j5-7f/sutx005lnko4wg7kubag.jpg',0),(37,32,'https://res.cloudinary.com/dqptpylda/image/upload/v1702001492/j5-7f/ddcu7366wv8xfxvvtgir.jpg',0),(38,33,'https://res.cloudinary.com/dqptpylda/image/upload/v1702001602/j5-7f/svqpjr5bhnemqduyaofh.jpg',0),(39,34,'https://res.cloudinary.com/dqptpylda/image/upload/v1702001687/j5-7f/ymaykpwkspj3u36cjbsh.jpg',0),(40,35,'https://res.cloudinary.com/dqptpylda/image/upload/v1702001794/j5-7f/pdttbbx7rjnvgketx5x9.jpg',0),(41,36,'https://res.cloudinary.com/dqptpylda/image/upload/v1702893620/j5-7f/s9yttbdbesgyonjfjrnv.jpg',0),(42,37,'https://res.cloudinary.com/dqptpylda/image/upload/v1702893776/j5-7f/d4dqeo90ecrygkiu7ckw.jpg',0),(43,38,'https://res.cloudinary.com/dqptpylda/image/upload/v1702893908/j5-7f/z9qbpcnwsk4ilj8ytcda.jpg',0),(44,39,'https://res.cloudinary.com/dqptpylda/image/upload/v1702894058/j5-7f/y37czmidpecoroivglrd.png',0),(45,40,'https://res.cloudinary.com/dqptpylda/image/upload/v1702894275/j5-7f/sf9wjfx7r3g4yinlf9ml.jpg',0),(46,41,'https://res.cloudinary.com/dqptpylda/image/upload/v1702894462/j5-7f/lyedvzzpttes780xbets.jpg',0),(47,42,'https://res.cloudinary.com/dqptpylda/image/upload/v1702902887/j5-7f/mfmriec83neiiubynmmf.jpg',0),(48,43,'https://res.cloudinary.com/dqptpylda/image/upload/v1702903054/j5-7f/w9dethhha0li2ublkcrr.jpg',0),(49,44,'https://res.cloudinary.com/dqptpylda/image/upload/v1702903260/j5-7f/krevbcelwnbkciods5tq.jpg',0),(50,45,'https://res.cloudinary.com/dqptpylda/image/upload/v1702903359/j5-7f/v9uxeei4yci9v5mgoymk.jpg',0),(51,46,'https://res.cloudinary.com/dqptpylda/image/upload/v1702903501/j5-7f/uboa8aqh0vouvuvchapl.jpg',0),(52,47,'https://res.cloudinary.com/dqptpylda/image/upload/v1702903626/j5-7f/kql1ya1apjtekauiuqdy.jpg',0),(53,48,'https://res.cloudinary.com/dqptpylda/image/upload/v1702903738/j5-7f/ies7s2kjtprm0dcth3js.jpg',0),(54,49,'https://res.cloudinary.com/dqptpylda/image/upload/v1702903856/j5-7f/l534ofpcga50ekt5x95j.jpg',0),(55,50,'https://res.cloudinary.com/dqptpylda/image/upload/v1702904032/j5-7f/ounoilm2hxjhxt9rkdse.jpg',0),(56,51,'https://res.cloudinary.com/dqptpylda/image/upload/v1702904179/j5-7f/cp3cgekcdzwjhhq7ybqp.jpg',0),(57,52,'https://res.cloudinary.com/dqptpylda/image/upload/v1702904378/j5-7f/lbv8eqhmzs2z9zwehy2g.jpg',0),(58,53,'https://res.cloudinary.com/dqptpylda/image/upload/v1702904520/j5-7f/eorre0nvh8hvczjqpjp0.jpg',0),(59,54,'https://res.cloudinary.com/dqptpylda/image/upload/v1702904657/j5-7f/jwckrujauu1zvzrstl4e.jpg',0),(60,55,'https://res.cloudinary.com/dqptpylda/image/upload/v1702904792/j5-7f/e3ittuce9503glw7yd6t.jpg',0),(61,56,'https://res.cloudinary.com/dqptpylda/image/upload/v1702904947/j5-7f/okuyfxjtymz66b1x1p8g.jpg',0),(62,57,'https://res.cloudinary.com/dqptpylda/image/upload/v1702905069/j5-7f/h43lrvim4egjdi8strjy.jpg',0),(63,58,'https://res.cloudinary.com/dqptpylda/image/upload/v1702905190/j5-7f/rajqvm8vn4cdsdya9gaj.jpg',0),(64,59,'https://res.cloudinary.com/dqptpylda/image/upload/v1702905296/j5-7f/pfou1ldrzmgv2qdhwfow.jpg',0),(65,60,'https://res.cloudinary.com/dqptpylda/image/upload/v1702905458/j5-7f/rrmbnaad33wutuunow2i.jpg',0),(66,61,'https://res.cloudinary.com/dqptpylda/image/upload/v1702905568/j5-7f/jvr91t2za0o7auknjdy5.jpg',0),(67,62,'https://res.cloudinary.com/dqptpylda/image/upload/v1702905717/j5-7f/wzxo7l88qp0cf1mjmskl.jpg',0),(68,63,'https://res.cloudinary.com/dqptpylda/image/upload/v1702905824/j5-7f/ykbyn1g1zyxisle4vrta.jpg',0),(70,64,'https://res.cloudinary.com/dqptpylda/image/upload/v1702906013/j5-7f/xibnfwwpjoanxvy7roxl.jpg',0),(71,65,'https://res.cloudinary.com/dqptpylda/image/upload/v1702906470/j5-7f/cksd0gqo1c3yyd1tf1wx.jpg',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=389 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_su_hoa_don`
--

LOCK TABLES `lich_su_hoa_don` WRITE;
/*!40000 ALTER TABLE `lich_su_hoa_don` DISABLE KEYS */;
INSERT INTO `lich_su_hoa_don` VALUES (104,194,NULL,8,'Tạo Hóa Đơn Thành Công','2023-10-26 10:48:00'),(105,194,NULL,9,'Thanh Toán Thành Công','2023-10-26 10:55:19'),(106,195,NULL,8,'Tạo Hóa Đơn Thành Công','2023-10-26 16:10:51'),(107,196,NULL,8,'Tạo Hóa Đơn Thành Công','2023-10-26 16:56:37'),(111,196,5,0,'Tạo Đơn Hàng Ship Thành Công','2023-10-28 12:47:36'),(112,196,NULL,7,'Chỉnh sửa sản phẩm: Quan Lolicon','2023-10-28 19:29:20'),(113,196,NULL,7,'Chỉnh sửa sản phẩm: Ao Kakame','2023-10-28 19:30:21'),(114,196,NULL,7,'Xóa Sản Phẩm: Quan Lolicon','2023-10-28 20:19:30'),(115,196,NULL,7,'Xóa Sản Phẩm: Quan Lolicon','2023-10-28 20:20:49'),(116,196,NULL,7,'Xóa Sản Phẩm: Quan Lolicon','2023-10-28 20:20:52'),(117,196,NULL,7,'Chỉnh sửa sản phẩm: Quan Lolicon','2023-10-28 20:25:25'),(118,197,NULL,11,'Tạo Hóa Đơn Treo Thành Công','2023-11-22 20:50:05'),(122,197,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-11-27 15:25:56'),(123,196,5,1,'hi','2023-11-27 15:25:56'),(124,196,5,2,'hi','2023-11-27 15:25:56'),(125,196,5,3,'hi','2023-11-27 15:25:56'),(127,199,NULL,11,'Tạo Hóa Đơn Thành Công','2023-11-30 12:51:09'),(129,197,NULL,1,'Đã xác nhận','2023-12-01 09:16:56'),(130,196,NULL,4,'Thanh Toán Thành Công','2023-12-01 18:49:20'),(131,199,NULL,9,'Thanh Toán Thành Công','2023-12-01 18:59:30'),(132,199,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-01 21:40:22'),(133,199,NULL,1,'Ổn','2023-12-02 15:22:32'),(141,199,NULL,2,'ok','2023-12-02 16:50:50'),(142,199,NULL,3,'ok','2023-12-02 16:50:50'),(143,199,NULL,5,'ok','2023-12-02 16:50:50'),(144,200,NULL,11,'Tạo Hóa Đơn Thành Công','2023-12-04 11:42:23'),(145,200,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-04 11:42:23'),(146,201,NULL,11,'Tạo Hóa Đơn Thành Công','2023-12-04 11:42:23'),(147,201,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-04 11:42:23'),(148,202,NULL,11,'Tạo Hóa Đơn Thành Công','2023-12-04 11:42:23'),(149,202,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-04 11:42:23'),(150,203,NULL,11,'Tạo Hóa Đơn Thành Công','2023-12-04 11:42:23'),(151,203,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-04 11:42:23'),(152,204,NULL,11,'Tạo Hóa Đơn Thành Công','2023-12-04 11:42:23'),(153,204,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-04 11:42:23'),(154,205,NULL,11,'Tạo Hóa Đơn Thành Công','2023-12-04 11:42:23'),(155,205,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-04 11:42:23'),(156,203,NULL,10,'Đơn Hàng Đã Bị Xóa','2023-12-04 17:24:15'),(182,197,NULL,6,'Trả Sản Phẩm: Quan Lolicon Với số lượng: 1','2023-12-06 10:26:14'),(183,197,NULL,6,'Trả Sản Phẩm: Quan Lolicon Với số lượng: 1','2023-12-06 10:26:20'),(184,206,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-06 15:50:35'),(186,206,NULL,7,'Thêm sản phẩm: Ao Kakame Với số lượng: 1','2023-12-06 16:47:27'),(187,205,NULL,7,'Sửa sản phẩm: Quan Lolicon Với số lượng: 3','2023-12-06 16:52:29'),(193,195,NULL,1,'Thanh Toán Thành Công','2023-12-10 17:30:49'),(194,195,NULL,2,'ok','2023-12-10 17:30:49'),(195,195,NULL,3,'ok','2023-12-10 17:30:49'),(196,212,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-10 17:30:49'),(197,212,NULL,1,'Thanh Toán Thành Công','2023-12-10 17:30:49'),(198,213,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-10 18:26:42'),(199,213,NULL,9,'Thanh Toán Thành Công','2023-12-10 18:30:40'),(200,214,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-10 18:36:55'),(201,214,NULL,9,'Thanh Toán Thành Công','2023-12-10 18:36:55'),(202,215,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-10 18:42:47'),(203,215,NULL,9,'Thanh Toán Thành Công','2023-12-10 18:42:47'),(204,216,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-10 18:52:45'),(205,216,NULL,9,'Thanh Toán Thành Công','2023-12-10 18:52:45'),(206,217,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-10 18:56:25'),(207,217,NULL,9,'Thanh Toán Thành Công','2023-12-10 18:56:25'),(208,218,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-10 18:56:25'),(209,218,NULL,9,'Thanh Toán Thành Công','2023-12-10 18:56:25'),(210,197,NULL,6,'Trả Sản Phẩm: Quần thể thao Badum Với số lượng: 1Lý Do Hủy Đơn: Không hay','2023-12-10 19:01:56'),(211,197,NULL,6,'Trả Sản Phẩm: Áo Kakame Với số lượng: 1Lý Do Hủy Đơn: Ko ổn ','2023-12-10 19:14:41'),(212,197,NULL,6,'Trả Sản Phẩm: Quần thể thao Badum Với số lượng: 1Lý Do Hủy Đơn: Không hay','2023-12-10 19:20:31'),(213,197,NULL,6,'Trả Sản Phẩm: Quần thể thao Badum Với số lượng: 1Lý Do Hủy Đơn: JO','2023-12-10 19:27:15'),(214,197,NULL,6,'Trả Sản Phẩm: Áo Kakame Với số lượng: 1Lý Do Hủy Đơn: Ko uwng','2023-12-10 19:31:56'),(215,219,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-10 21:52:37'),(218,222,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-11 12:07:28'),(219,222,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-11 12:10:20'),(221,224,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-11 12:11:55'),(222,224,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-11 12:12:58'),(224,226,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-11 12:12:58'),(225,226,NULL,9,'Thanh Toán Thành Công','2023-12-11 12:12:58'),(226,226,NULL,0,'Thanh Toán Online','2023-12-11 12:12:58'),(227,226,NULL,6,'Không Thích','2023-12-11 12:12:58'),(228,227,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-11 21:24:30'),(229,227,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-11 21:24:30'),(230,205,NULL,1,'Ok','2023-12-11 21:24:30'),(231,219,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-12 08:56:54'),(232,228,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-12 16:52:36'),(233,229,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-12 16:52:36'),(234,230,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-12 16:59:06'),(235,231,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-12 16:59:06'),(236,231,NULL,10,'Đơn Hàng Đã Bị Xóa','2023-12-12 16:59:06'),(237,232,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-12 16:59:06'),(238,224,NULL,7,'Sửa sản phẩm: Quần cộc Mile Với số lượng: 4','2023-12-12 17:16:23'),(239,224,NULL,7,'Sửa sản phẩm: Quần cộc Mile Với số lượng: 1','2023-12-12 17:16:53'),(240,227,NULL,7,'Sửa sản phẩm: Áo Kakame Với số lượng: 1','2023-12-13 09:19:20'),(246,204,NULL,12,'Thay Đổi Thông Tin Khách Hàng: 23 Kim Hoàng, Xã Trung Sơn, Huyện Yên Lập, Phú Thọ','2023-12-13 16:06:04'),(249,227,NULL,12,'Thay Đổi Thông Tin Khách Hàng: Kon Tum, Huyện Kon Rẫy, Xã Đắk Tơ Lung, ','2023-12-13 20:47:15'),(252,227,NULL,7,'Xóa Sản Phẩm: Áo TheCown','2023-12-13 21:27:25'),(253,227,NULL,12,'Thay Đổi Thông Tin Khách Hàng: Hà Nội, Huyện Thường Tín, Xã Thư Phú, Số 1','2023-12-13 20:47:15'),(254,227,NULL,10,'Đơn Hàng Đã Bị Xóa','2023-12-13 20:47:15'),(255,200,NULL,12,'Thay Đổi Thông Tin Khách Hàng: 21 Hoàng Bin, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội','2023-12-13 20:47:15'),(257,202,NULL,7,'Thêm sản phẩm: Quần ARADO Với số lượng: 1','2023-12-14 16:40:42'),(258,202,NULL,7,'Thêm sản phẩm: Quần ARADO Với số lượng: 1','2023-12-14 16:50:59'),(259,202,NULL,7,'Thêm sản phẩm: Quần ARADO Với số lượng: 1','2023-12-14 16:52:09'),(260,202,NULL,7,'Thêm sản phẩm: Áo TheCown Với số lượng: 1','2023-12-14 16:52:17'),(261,224,NULL,7,'Thêm sản phẩm: Quần ARADO Với số lượng: 1','2023-12-14 18:02:14'),(262,200,NULL,7,'Thêm sản phẩm: Quần Jeans Với số lượng: 1','2023-12-14 21:57:08'),(263,200,NULL,7,'Xóa Sản Phẩm: Áo Kakame','2023-12-14 21:58:39'),(264,200,NULL,7,'Thêm sản phẩm: Áo TheCown Với số lượng: 1','2023-12-14 22:01:01'),(265,200,NULL,7,'Xóa Sản Phẩm: Quần Jeans','2023-12-14 22:01:35'),(266,200,NULL,12,'Thay Đổi Thông Tin Khách Hàng: 23 Kim Hoàng, Xã Trung Sơn, Huyện Yên Lập, Phú Thọ','2023-12-14 21:18:25'),(273,232,NULL,9,'Thanh Toán Thành Công','2023-12-15 18:33:58'),(274,230,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-15 23:11:48'),(279,244,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-15 23:11:48'),(280,244,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-15 23:11:48'),(283,247,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-15 23:53:21'),(284,247,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-16 00:01:47'),(285,229,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-16 00:01:47'),(286,248,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-16 09:33:44'),(287,249,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-16 09:33:44'),(288,250,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-16 09:33:44'),(289,244,NULL,1,'ok','2023-12-16 09:33:44'),(290,244,NULL,2,'ok','2023-12-16 09:33:44'),(291,244,NULL,3,'ok','2023-12-16 09:33:44'),(292,244,NULL,4,'Thanh Toán Thành Công','2023-12-16 09:33:44'),(293,228,NULL,10,'Đơn Hàng Đã Bị Xóa','2023-12-16 09:33:44'),(296,252,NULL,8,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-16 11:13:21'),(297,200,NULL,7,'Thêm sản phẩm: Áo Kakame Với số lượng: 9','2023-12-16 14:58:19'),(298,200,NULL,12,'Thay Đổi Thông Tin Khách Hàng: 15 Hàng Kim, Xã Nậm Pì, Huyện Nậm Nhùn, Lai Châu','2023-12-16 14:25:47'),(299,200,NULL,7,'Sửa sản phẩm: Áo Kakame Với số lượng: 2','2023-12-16 15:16:35'),(300,200,NULL,12,'Thay Đổi Thông Tin Khách Hàng: 21 Hoàng Bin, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội','2023-12-16 14:25:47'),(301,200,NULL,7,'Xóa Sản Phẩm: Áo Kakame','2023-12-16 15:28:42'),(302,200,NULL,12,'Thay Đổi Thông Tin Khách Hàng: 15 Hàng Kim, Xã Nậm Pì, Huyện Nậm Nhùn, Lai Châu','2023-12-16 14:25:47'),(303,253,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-16 14:25:47'),(304,253,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-16 14:25:47'),(305,254,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-16 14:25:47'),(306,254,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-16 14:25:47'),(307,255,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-16 14:25:47'),(308,255,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-16 14:25:47'),(311,258,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-16 14:25:47'),(312,258,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-16 14:25:47'),(315,261,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-16 14:25:47'),(316,261,NULL,9,'Thanh Toán Thành Công','2023-12-16 14:25:47'),(317,261,NULL,0,'Thanh Toán Online','2023-12-16 14:25:47'),(319,263,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-16 18:04:06'),(320,263,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-16 18:04:06'),(321,263,NULL,7,'Thêm sản phẩm: Áo TheCown Với số lượng: 1','2023-12-16 18:14:33'),(322,264,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-16 18:04:06'),(323,264,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-16 18:04:06'),(324,264,NULL,7,'Thêm sản phẩm: Quần ARADO Với số lượng: 1','2023-12-16 18:16:40'),(325,264,NULL,10,'Đơn Hàng Đã Bị Xóa','2023-12-16 18:04:06'),(328,263,NULL,1,'ok','2023-12-17 10:19:47'),(329,263,NULL,2,'ok','2023-12-17 10:19:47'),(330,263,NULL,3,'ok','2023-12-17 10:19:47'),(331,263,NULL,4,'Thanh Toán Thành Công','2023-12-17 10:43:34'),(332,263,NULL,5,'Đã thành công','2023-12-17 10:43:34'),(371,305,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-18 11:31:58'),(372,305,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-12-18 11:31:58'),(373,306,NULL,11,'Tạo Đơn Chờ Tại Quầy Thành Công','2023-12-18 11:31:58'),(374,306,NULL,9,'Thanh Toán Thành Công','2023-12-18 11:31:58'),(375,306,NULL,0,'Thanh Toán Online','2023-12-18 11:31:58'),(376,258,NULL,12,'Thay Đổi Thông Tin Khách Hàng: 76 Huy Hoàng, Xã Lợi Hải, Huyện Thuận Bắc, Ninh Thuận','2023-12-18 11:31:58'),(382,258,NULL,12,'Thay Đổi Thông Tin Khách Hàng: 76 Huy Hoàng, Xã Lợi Hải, Huyện Thuận Bắc, Ninh Thuận','2023-12-18 11:31:58'),(383,306,NULL,12,'Thay Đổi Thông Tin Khách Hàng: 86 Huynh Quy, Xã Hương Ngải, Huyện Thạch Thất, Hà Nội','2023-12-18 11:31:58'),(384,306,NULL,12,'Thay Đổi Thông Tin Khách Hàng: 14 Binh Boe, Xã Nghĩa Lợi, Thị xã Nghĩa Lộ, Yên Bái','2023-12-18 11:31:58'),(385,306,NULL,1,'Okay','2023-12-18 11:31:58'),(386,306,NULL,2,'Okay','2023-12-18 11:31:58'),(387,306,NULL,3,'Okay','2023-12-18 11:31:58'),(388,306,NULL,5,'Okay','2023-12-18 11:31:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai_co_ao`
--

LOCK TABLES `loai_co_ao` WRITE;
/*!40000 ALTER TABLE `loai_co_ao` DISABLE KEYS */;
INSERT INTO `loai_co_ao` VALUES (1,'CA01','Cổ Tròn',0),(2,'CA02','Cổ V',0),(3,'CAEFCE67FB2','Cổ Cài Khuy',0),(4,'CA8F0E5F3C1','Cổ Cách Dơi',0),(5,'CAEA4A944F2','Cổ Bẻ',0),(6,'CA966CEEFFF','Cổ Đinh Kim',0),(7,'CA16A06ABF6','Cổ Sử Tử',0),(8,'CA5FD54A433','Cổ Dây Kéo',0),(9,'CA67BC27884','Cổ Sâu',0),(10,'CA91FC0A8A6','Cổ Lật',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai_sp`
--

LOCK TABLES `loai_sp` WRITE;
/*!40000 ALTER TABLE `loai_sp` DISABLE KEYS */;
INSERT INTO `loai_sp` VALUES (4,'LSP01','Áo Gym',0),(5,'LSP02','Quần Gym',0),(6,'LSP974697AEC','Áo Gió',0),(7,'LSPE3FAA58B2','Quần Short Chạy Bộ',0),(8,'LSP49EEA4DDA','Quần Jogger',0),(9,'LSPC86C02750','Quần Legging',0),(10,'LSP180ACF28A','Áo Khoác',0),(11,'LSP89E2614C0','Áo Tank Top',0),(12,'LSPE9CC597FD','Áo Hoodie',0),(13,'LSP98BA64A0F','Áo Giữ Nhiệt',0),(14,'LSPC6AEE81E2','Bộ GYM',0),(15,'LSP504C3DE6E','Bộ Thể Thao',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mau_sac`
--

LOCK TABLES `mau_sac` WRITE;
/*!40000 ALTER TABLE `mau_sac` DISABLE KEYS */;
INSERT INTO `mau_sac` VALUES (4,'MS01','Đỏ',0),(5,'MS02','Xanh',0),(6,'MS03','Tím',0),(7,'MS4A94AB36E','Vàng',0),(8,'MS452A59697','Hồng',0),(9,'MSBF85D4278','Nâu',0),(10,'MS653A4A3A5','Đen',0),(11,'MSD14242C69','Trắng',0),(12,'MSEF28E32C2','Xám',0),(13,'MS0DD74FCF6','Cam',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ong_tay_ao`
--

LOCK TABLES `ong_tay_ao` WRITE;
/*!40000 ALTER TABLE `ong_tay_ao` DISABLE KEYS */;
INSERT INTO `ong_tay_ao` VALUES (1,'TA01','Ngắn',0),(2,'TA02','Dài',0),(3,'TA4AB09D4E7','Ragnal',0),(4,'TA7A4A1D8C7','Cánh Dơi',0),(5,'TA0673981FC','Cộc',0),(6,'TAF198BF828','Polo',0),(7,'TAFB3AB8617','Ba Lỗ',0),(8,'TAF70CA929E','Đính Nút',0),(9,'TA86C0BF4BC','Lửng',0),(10,'TAE805F3DE0','Đồng Đều',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `san_pham`
--

LOCK TABLES `san_pham` WRITE;
/*!40000 ALTER TABLE `san_pham` DISABLE KEYS */;
INSERT INTO `san_pham` VALUES (5,'SP01','Quần thể thao Badum',11,4,17,1,1,'Xau',1),(6,'SP02','Áo Kakame',12,5,102,2,2,'Moi',0),(7,'SP03','Quần ARADO',13,4,105,1,1,'Haha',1),(9,'SP526691D50','Áo TheCown',12,4,102,2,1,'Thoáng Mát',1),(10,'SPB6A2FB2B6','Áo Monoco',12,4,104,1,2,'Mềm',1),(11,'SPB1C165530','Quần Jeans',11,4,102,2,1,'Bông',0),(12,'SP4E41A039A','Áo dài tay Nexos',16,4,111,2,1,'Ok',0),(13,'SP6BE341547','Áo Vandal',12,4,110,2,3,'Đẹp',0),(14,'SP6858F14D1','Áo kháo Adias',12,4,105,2,4,'Ok',0),(15,'SP4389A6F72','Áo cộc Bagas',15,4,114,1,5,'Good',0),(16,'SPBACF723F1','Quần áo Bagas',13,7,111,5,1,'Good',0),(17,'SP7CDF0A426','Quần Manus',12,5,112,2,1,'Nice',0),(18,'SP3EDB351D4','Bộ quần áo Adias',15,13,17,2,1,'Ok',0),(19,'SPA271546CF','Áo khoác Nikke',15,10,112,1,1,'Good',0),(20,'SPF23BAA5AC','Quần dài Amus',17,9,115,2,1,'Ok',0),(21,'SP3C3869272','Áo khoác Blaze',12,4,113,2,3,'Ok',0),(22,'SP47B1A1F55','Áo khoác FireRed',20,10,102,6,8,'Good',0),(23,'SPFF32D6122','Quần cộc Mile',13,7,111,1,1,'Ok',0),(24,'SP78E523996','Quần dài Op',18,9,113,2,1,'Nice',0),(25,'SPA66626DC4','Áo bó Nexos',12,13,115,3,4,'Ok',0),(26,'SP79FE066EE','Áo hoodie Amus',15,12,105,2,10,'Yes',0),(27,'SPA31C510E6','Quần dài Nikke',18,8,105,2,1,'Ok',0),(28,'SPFD3CAABC9','Áo cộc Manus',14,4,114,1,10,'Ok',0),(29,'SP3831DBB3F','Áo KF97',19,11,17,7,7,'Good',0),(30,'SPE3993382B','Bộ quần áo Nikke',16,4,110,2,1,'Ok',0),(31,'SP10CEDD858','Quần ngắn Baks',14,7,113,1,1,'',0),(32,'SP89BA16F9C','Áo gym Bagas',19,11,111,7,6,'Yes',0),(33,'SP2707C3241','Quần Hib',17,9,112,2,6,'Yes',0),(34,'SPBB0C1AFAF','Áo Repwear',18,4,104,6,4,'',0),(35,'SP332C32900','Áo LiveFit',18,4,104,5,9,'',0),(36,'SP93C1701D7','Bộ quần áo Amus',14,4,17,5,1,'',0),(37,'SP418127398','Áo BlackWolf',20,11,113,7,9,'Ok',9),(38,'SPB991DE2B6','Áo AXA',17,13,110,6,1,'Good',0),(39,'SP573419B03','Áo BQLOW',14,5,111,7,1,'Nice',0),(40,'SPBBBA58E63','Bộ quần áo R=VD',18,4,114,7,1,'',0),(41,'SP4AF957F3C','Áo Gambis',17,13,115,8,1,'',0),(42,'SP0A8361DCC','Áo Gekm',17,4,110,7,7,'',9),(43,'SPAB2CA9E9E','Áo GenMan',12,4,104,3,9,'',0),(44,'SPE0F5F6C78','Quần dài Luk',11,9,112,2,1,'',0),(45,'SP90F39AAE1','Áo Butz',19,11,17,3,7,'',0),(46,'SP86A02344B','Bộ quần áo Yinghu',18,13,111,10,6,'',0),(47,'SPCA8965F06','Áo Bulking',15,4,110,8,4,'',0),(48,'SP29C661EAB','Áo Superman',17,10,111,8,5,'',0),(49,'SP7B333502A','Bộ quần áo ECGH',13,4,115,5,9,'',0),(50,'SP543978C47','Bộ quần áo AOLikes',11,14,104,9,8,'',0),(51,'SP53F7CC2FD','Áo Blizt',18,4,102,6,2,'',0),(52,'SP1FFA2474C','Quần Lier',19,5,112,1,1,'',0),(53,'SP2ED05B912','Áo Harbour',13,4,112,9,1,'',0),(54,'SPCC0C36776','Áo Shark',18,13,114,7,9,'',0),(55,'SPD18C523A3','Áo Ck',20,13,105,4,10,'',0),(56,'SPB6FEEEB46','Áo Gust',18,4,105,3,4,'',0),(57,'SP8483F0477','Áo Muslta',12,4,115,6,7,'',0),(58,'SP1083BB6C0','Quần I4',15,7,17,1,1,'',0),(59,'SP9BACEE735','Bộ quần áo BFBlades',14,14,105,7,4,'',0),(60,'SP9F774FA87','Quần Tryrant',14,7,112,1,1,'',0),(61,'SP44AE07369','Áo VIO',20,13,113,2,1,'',0),(62,'SP9F941D987','Áo WarmUp',17,4,17,1,3,'',0),(63,'SP7B522256B','Áo Alan',17,12,17,9,10,'',0),(64,'SPD0F893BF2','Quần DiaL',16,8,114,1,3,'',0),(65,'SPC10E14E2A','Bộ quần áo GKIN',17,15,105,2,8,'Ok',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (5,'Size01','M',0),(6,'Size02','L',0),(7,'Size03','S',0),(8,'SizeAFF6B4C48','XL',0),(9,'Size1C848FDDF','XXL',0),(10,'SizeADEFC8F20','XXXL',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_khoan`
--

LOCK TABLES `tai_khoan` WRITE;
/*!40000 ALTER TABLE `tai_khoan` DISABLE KEYS */;
INSERT INTO `tai_khoan` VALUES (1,1,'TK01','Nguyen','Nghia',NULL,'nghiacoivipne@gmail.com','0337842655','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(2,8,'TK02','Nguyen','Van Manh',NULL,'manhVanNguyen@gmail.com','0578267849','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(3,9,'TK03','Hoang','Nam',NULL,'nguyenVanA@gmail.com','0578694258','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(4,9,'TK04','Nguyen','Huy Cuong',NULL,'nguyenVanB@gmail.com','0206070809','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(5,9,'TK05','Nguyen','Hoang Yen',NULL,'nguyenVanC@gmail.com','0708681458','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(6,9,'TK06','Ta','Dinh Nam',NULL,'nguyenVanD@gmail.com','0802147869','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(25,8,'TK007','ADV','Ha',NULL,'advha@gmail.com','0378268945','$2a$10$K4DbrrY9cvrXcAB5dd/8B.gAABnBh06G7Ce6pISC5ucexyCI8EDSa',0),(26,9,'TK8DCBD2A5B','Nguyễn Trọng','Nghĩa',NULL,'ytbcointn@gmail.com',NULL,'$2a$10$FFnwL3U.wt8fUFZaqUugMumRFedGyejNWo19/428FHfRQIIprQdGS',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xuat_xu`
--

LOCK TABLES `xuat_xu` WRITE;
/*!40000 ALTER TABLE `xuat_xu` DISABLE KEYS */;
INSERT INTO `xuat_xu` VALUES (17,'XX01','Việt Nam',0),(102,'XX02','Mỹ',0),(104,'XX03 ','Trung Quốc',0),(105,'XX04','Nhật Bản',0),(110,'XX05','Úc',0),(111,'XXA00D5E307','Đức',0),(112,'XX800B4F577','Pháp',0),(113,'XXA70FF002A','Anh',0),(114,'XXDB274BDBA','Ấn Độ',0),(115,'XXA958D9830','Hàn Quốc',0);
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

-- Dump completed on 2023-12-18 21:26:30
