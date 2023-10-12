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
  `so_luong_ton` int DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_ctsp`),
  KEY `id_sp_idx` (`id_sp`),
  KEY `id_size_idx` (`id_size`),
  CONSTRAINT `id_size` FOREIGN KEY (`id_size`) REFERENCES `size` (`id_size`),
  CONSTRAINT `id_sp` FOREIGN KEY (`id_sp`) REFERENCES `san_pham` (`id_sp`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_san_pham`
--

LOCK TABLES `chi_tiet_san_pham` WRITE;
/*!40000 ALTER TABLE `chi_tiet_san_pham` DISABLE KEYS */;
INSERT INTO `chi_tiet_san_pham` VALUES (14,5,5,2619,0),(15,5,6,289,0),(16,7,5,9453,0),(17,6,7,6822,0),(18,8,6,1,0),(19,8,5,3,0);
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
  `id_ctsp` int DEFAULT NULL,
  `id_giam_gia` int DEFAULT NULL,
  `don_gia` decimal(38,2) DEFAULT NULL,
  `so_tien_con_lai` decimal(38,2) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_ggct`),
  KEY `id_giam_gia_idx` (`id_giam_gia`),
  KEY `id_ctsp_id1x` (`id_ctsp`),
  CONSTRAINT `id_ctsp1` FOREIGN KEY (`id_ctsp`) REFERENCES `chi_tiet_san_pham` (`id_ctsp`),
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
  `id_hd` int DEFAULT NULL,
  `so_tien` decimal(38,2) DEFAULT NULL,
  `hinh_thuc` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_httt`),
  KEY `id_hd2_idx` (`id_hd`),
  CONSTRAINT `id_hd2` FOREIGN KEY (`id_hd`) REFERENCES `hoa_don` (`id_hd`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinh_thuc_thanh_toan`
--

LOCK TABLES `hinh_thuc_thanh_toan` WRITE;
/*!40000 ALTER TABLE `hinh_thuc_thanh_toan` DISABLE KEYS */;
INSERT INTO `hinh_thuc_thanh_toan` VALUES (20,78,NULL,'Payment by cash','Hoho',0),(21,94,467000.00,'Thanh Toán Online','Thanh Toán Online',0),(22,94,123000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(23,138,580000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(24,140,120000.00,'Thanh Toán Online','Thanh Toán Online',0),(25,140,500000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(26,142,565000.00,'Thanh Toán Online','Thanh Toán Online',0),(27,142,15000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0),(28,146,270000.00,'Thanh Toán Online','Thanh Toán Online',0),(29,146,78000.00,'Thanh Toán Tiền Mặt','Thanh Toán Tiền Mặt',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don`
--

LOCK TABLES `hoa_don` WRITE;
/*!40000 ALTER TABLE `hoa_don` DISABLE KEYS */;
INSERT INTO `hoa_don` VALUES (1,1,NULL,'HD1','So 7 Nha A','2023-07-24','2023-07-27','2023-07-26','2023-07-23','2023-07-23','0978562378','0345897612',0.00,'Nguyen Thi Ny','Nguyen Van A',6000.00,6000.00,0.00,0.00,6000.00,1,9),(77,1,NULL,'HD49','So 3 Nha A','2023-07-24','2023-07-27','2023-07-26','2023-07-03','2023-07-23','0504080906',NULL,NULL,'Nguyen Van A',NULL,6000.00,6000.00,0.00,0.00,6000.00,2,3),(78,1,NULL,'HD59','So 46 Nha A',NULL,NULL,NULL,'2023-07-03','2023-07-25','064827236',NULL,NULL,'Nguyen Van B',NULL,5000.00,5000.00,0.00,0.00,5000.00,2,4),(79,1,NULL,'HD60','So 4 Nha A',NULL,NULL,NULL,'2023-07-18',NULL,'0987326547',NULL,NULL,'Nguyen Van C',NULL,9645.00,9645.00,0.00,0.00,9645.00,2,3),(80,1,NULL,'HD61','So 5 Nha A',NULL,NULL,NULL,'2023-07-18',NULL,'0204080906',NULL,NULL,'Nguyen Van D',NULL,NULL,NULL,NULL,NULL,NULL,2,1),(81,1,NULL,'HD62','So 6 Nha A',NULL,NULL,NULL,'2023-07-18',NULL,'0708654123',NULL,NULL,'Nguyen Van E',NULL,NULL,NULL,NULL,NULL,NULL,2,1),(82,1,NULL,'HD63',NULL,NULL,NULL,NULL,'2023-07-18','2023-08-12','0907080504',NULL,NULL,'Nguyen Hoang Nam',NULL,87451287.00,4565758.00,NULL,4542758.00,NULL,1,9),(83,1,NULL,'HD64','So 7 Nha A',NULL,NULL,NULL,'2023-07-19',NULL,'0706090408',NULL,NULL,'Nguyen Van H',NULL,NULL,NULL,NULL,NULL,NULL,2,1),(84,1,NULL,'HD65',NULL,NULL,NULL,NULL,'2023-07-19','2023-08-12','0789456923',NULL,NULL,'Nguyen Thi B',NULL,31000.00,31000.00,NULL,0.00,NULL,1,9),(85,1,NULL,'HD66','So 8 Nha A',NULL,NULL,NULL,'2023-07-19',NULL,'0601070809',NULL,NULL,'Nguyen Van I',NULL,NULL,NULL,NULL,NULL,NULL,2,1),(86,1,NULL,'HD67','29000',NULL,NULL,NULL,'2023-07-19','2023-08-12','',NULL,NULL,'',NULL,2.00,NULL,NULL,NULL,NULL,1,NULL),(87,1,NULL,'HD68','So 9 Nha A',NULL,NULL,NULL,'2023-07-19',NULL,'0709080601',NULL,NULL,'Nguyen Van G',NULL,NULL,NULL,NULL,NULL,NULL,2,1),(88,1,NULL,'HD69',NULL,NULL,NULL,NULL,'2023-07-19',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,0),(89,1,NULL,'HD70',NULL,NULL,NULL,NULL,'2023-07-19',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,0),(90,1,NULL,'HD71',NULL,NULL,NULL,NULL,'2023-07-19','2023-08-15','',NULL,NULL,'',NULL,9645.00,NULL,NULL,NULL,NULL,NULL,1),(91,1,NULL,'HD72',NULL,NULL,NULL,NULL,'2023-07-19','2023-08-16',NULL,NULL,NULL,NULL,NULL,NULL,900000.00,NULL,NULL,NULL,1,9),(92,1,NULL,'HD73',NULL,NULL,NULL,NULL,'2023-07-19',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,0),(93,1,NULL,'HD74',NULL,NULL,NULL,NULL,'2023-07-19',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,0),(94,1,NULL,'HD75',NULL,NULL,NULL,NULL,'2023-07-19','2023-08-16',NULL,NULL,NULL,NULL,NULL,NULL,467000.00,NULL,NULL,590000.00,1,9),(95,1,NULL,'HD76',NULL,NULL,NULL,NULL,'2023-07-19',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,10),(96,1,NULL,'HD77',NULL,NULL,NULL,NULL,'2023-07-19',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,0),(97,1,NULL,'HD78',NULL,NULL,NULL,NULL,'2023-07-19',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,0),(98,1,NULL,'HD79',NULL,NULL,NULL,NULL,'2023-07-20',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,0),(99,1,NULL,'HD80',NULL,NULL,NULL,NULL,'2023-07-22',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,10),(100,1,NULL,'HD81',NULL,NULL,NULL,NULL,'2023-07-22',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,10),(101,1,NULL,'HD82',NULL,NULL,NULL,NULL,'2023-07-22',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,10),(109,NULL,NULL,'HD00002',NULL,NULL,NULL,NULL,'2023-08-12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(110,NULL,NULL,'HD00003',NULL,NULL,NULL,NULL,'2023-08-12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(111,NULL,NULL,'HD00004',NULL,NULL,NULL,NULL,'2023-08-12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(112,NULL,NULL,'HD00005',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(113,NULL,NULL,'HD00006',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(114,NULL,NULL,'HD00007',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(115,NULL,NULL,'HD00008',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(116,NULL,NULL,'HD00009',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(117,NULL,NULL,'HD00010',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(118,NULL,NULL,'HD00011',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL,8),(119,NULL,NULL,'HD00012',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(120,NULL,NULL,'HD00013',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(121,NULL,NULL,'HD00014',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(122,NULL,NULL,'HD00015',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(123,NULL,NULL,'HD00016',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(124,NULL,NULL,'HD00017',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(125,NULL,NULL,'HD00018',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(126,NULL,NULL,'HD00019',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(127,NULL,NULL,'HD00020',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(128,NULL,NULL,'HD00021',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(129,NULL,NULL,'HD00022',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(130,NULL,NULL,'HD00023',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(131,NULL,NULL,'HD00024',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(132,NULL,NULL,'HD00025',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(133,NULL,NULL,'HD00026',NULL,NULL,NULL,NULL,'2023-08-14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL,10),(134,NULL,NULL,'HD00027',NULL,NULL,NULL,NULL,'2023-08-16',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10),(135,NULL,NULL,'HD00028',NULL,NULL,NULL,NULL,'2023-08-16','2023-08-16',NULL,NULL,NULL,NULL,NULL,900000.00,900000.00,NULL,NULL,900000.00,NULL,10),(136,NULL,NULL,'HD00029',NULL,NULL,NULL,NULL,'2023-08-16','2023-08-16',NULL,NULL,NULL,NULL,NULL,900000.00,900000.00,NULL,NULL,NULL,NULL,9),(137,NULL,NULL,'HD00030',NULL,NULL,NULL,NULL,'2023-08-16','2023-08-16',NULL,NULL,NULL,NULL,NULL,900000.00,900000.00,NULL,NULL,NULL,NULL,9),(138,NULL,NULL,'HD00031',NULL,NULL,NULL,NULL,'2023-08-16','2023-08-16','',NULL,NULL,'',NULL,580000.00,580000.00,NULL,0.00,580000.00,NULL,1),(139,NULL,NULL,'HD00032','Tỉnh Thái Nguyên, Thành phố Sông Công, Phường Phố Cò, Số 1 Haha',NULL,NULL,NULL,'2023-08-16','2023-08-17','0389781545',NULL,NULL,'Nguyễn Hoàng B',NULL,580000.00,NULL,NULL,NULL,580000.00,2,0),(140,NULL,NULL,'HD00001','Tỉnh Tuyên Quang, Huyện Lâm Bình, Xã Thượng Lâm, Số 5 HOHO',NULL,NULL,NULL,'2023-08-17','2023-08-17','0378492645',NULL,NULL,'Nguyễn Hoàng C',NULL,620000.00,120000.00,NULL,NULL,620000.00,2,4),(141,NULL,NULL,'HD00033',NULL,NULL,NULL,NULL,'2023-08-17',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,1,8),(142,NULL,NULL,'HD00034','Tỉnh Thái Nguyên, Huyện Đồng Hỷ, Xã Khe Mo, 15 HUynh Nam',NULL,NULL,NULL,'2023-08-17','2023-08-17','0678468915',NULL,NULL,'Nguyen Khu C',NULL,580000.00,565000.00,NULL,NULL,580000.00,2,5),(143,NULL,NULL,'HD00035',NULL,NULL,NULL,NULL,'2023-08-17',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,145000.00,1,8),(144,NULL,NULL,'HD00036',NULL,NULL,NULL,NULL,'2023-08-17',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,1,10),(145,NULL,NULL,'HD00037',NULL,NULL,NULL,NULL,'2023-08-17',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,348000.00,1,10),(146,NULL,NULL,'HD00038','Tỉnh Thái Nguyên, Huyện Đại Từ, Xã Phục Linh, Số 1 Lag quá',NULL,NULL,NULL,'2023-08-17','2023-08-17','0578592678',NULL,NULL,'Nguyễn Trọng N',NULL,348000.00,270000.00,NULL,NULL,348000.00,2,5),(147,NULL,NULL,'HD00001',NULL,NULL,NULL,NULL,'2023-10-06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,1,8),(148,NULL,NULL,'HD00002',NULL,NULL,NULL,NULL,'2023-10-06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,1,8);
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
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don_chi_tiet`
--

LOCK TABLES `hoa_don_chi_tiet` WRITE;
/*!40000 ALTER TABLE `hoa_don_chi_tiet` DISABLE KEYS */;
INSERT INTO `hoa_don_chi_tiet` VALUES (40,14,1,1,6000.00,NULL,0),(41,15,77,1,6000.00,NULL,0),(42,16,78,1,5000.00,NULL,0),(43,17,79,1,9645.00,NULL,0),(91,14,109,3,18000.00,NULL,NULL),(96,17,82,1,5000.00,NULL,NULL),(97,14,82,3,18000.00,NULL,NULL),(98,15,84,1,6000.00,NULL,NULL),(99,17,84,5,25000.00,NULL,NULL),(100,17,86,1,5000.00,NULL,NULL),(101,14,86,4,24000.00,NULL,NULL),(103,14,111,4,24000.00,NULL,NULL),(104,16,111,1,9645.00,NULL,NULL),(115,17,91,4,20000.00,NULL,NULL),(116,14,91,3,18000.00,NULL,NULL),(132,16,90,3,28935.00,NULL,NULL),(137,16,136,3,28935.00,NULL,NULL),(138,16,137,2,19290.00,NULL,NULL),(139,16,135,3,435000.00,NULL,NULL),(140,17,135,3,465000.00,NULL,NULL),(141,16,94,3,435000.00,NULL,NULL),(142,17,94,1,155000.00,NULL,NULL),(143,16,138,4,580000.00,NULL,NULL),(144,16,139,4,580000.00,NULL,NULL),(145,17,140,4,620000.00,NULL,NULL),(146,16,142,4,580000.00,NULL,NULL),(147,16,143,1,145000.00,NULL,NULL),(149,14,145,3,348000.00,NULL,NULL),(150,14,146,3,348000.00,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_su_hoa_don`
--

LOCK TABLES `lich_su_hoa_don` WRITE;
/*!40000 ALTER TABLE `lich_su_hoa_don` DISABLE KEYS */;
INSERT INTO `lich_su_hoa_don` VALUES (1,77,1,0,'Đã đặt hàng','2023-07-01 14:30:00'),(5,77,1,1,'Đã xác nhận đơn hàng','2023-07-02 14:30:00'),(6,77,1,2,'Đã xác nhân người thanh toán','2023-07-03 14:30:00'),(7,77,1,3,'Đã chuyển cho đơn vị vận chuyển','2023-07-04 14:30:00'),(8,77,1,4,'Đã xác nhận thanh toán','2023-07-05 14:30:00'),(9,77,1,5,'Đã giao hàng thành công','2023-07-05 14:30:00'),(11,135,1,8,'Tạo Hóa Đơn Thành Công','2023-08-16 16:39:03'),(12,135,1,9,'Thanh Toán Thành Công','2023-08-16 16:39:03'),(13,136,NULL,8,'Tạo Hóa Đơn Thành Công','2023-08-16 16:57:43'),(15,137,NULL,8,'Tạo Hóa Đơn Thành Công','2023-08-16 17:00:41'),(18,136,NULL,9,'Thanh Toán Thành Công','2023-08-16 17:16:13'),(19,94,NULL,9,'Thanh Toán Thành Công','2023-08-16 22:50:03'),(20,138,NULL,8,'Tạo Hóa Đơn Thành Công','2023-08-16 22:51:22'),(21,138,NULL,1,'Thanh Toán Thành Công','2023-08-16 22:53:44'),(22,139,NULL,8,'Tạo Hóa Đơn Thành Công','2023-08-16 22:54:46'),(23,139,NULL,0,'Tạo Đơn Hàng Online Thành Công','2023-08-17 00:24:31'),(24,140,NULL,8,'Tạo Hóa Đơn Thành Công','2023-08-17 07:55:50'),(25,140,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-08-17 07:56:59'),(26,140,NULL,1,'','2023-08-17 08:30:32'),(27,140,NULL,2,'','2023-08-17 08:48:11'),(28,140,NULL,3,'','2023-08-17 08:57:02'),(29,140,NULL,4,'Thanh Toán Thành Công','2023-08-17 10:00:15'),(30,141,NULL,8,'Tạo Hóa Đơn Thành Công','2023-08-17 23:03:49'),(31,142,NULL,8,'Tạo Hóa Đơn Thành Công','2023-08-17 23:14:10'),(32,142,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-08-17 23:16:41'),(33,142,NULL,1,'Ok','2023-08-17 23:16:51'),(34,142,NULL,2,'Ok','2023-08-17 23:17:04'),(35,142,NULL,3,'Ok','2023-08-17 23:17:09'),(36,142,NULL,4,'Thanh Toán Thành Công','2023-08-17 23:18:21'),(37,142,NULL,5,'Đã Giao','2023-08-17 23:19:22'),(38,133,NULL,8,'Đơn Hàng Đã Bị Xóa','2023-08-17 23:44:57'),(39,143,NULL,8,'Tạo Hóa Đơn Thành Công','2023-08-17 23:45:06'),(40,135,NULL,8,'Đơn Hàng Đã Bị Xóa','2023-08-17 23:45:31'),(41,144,NULL,8,'Tạo Hóa Đơn Thành Công','2023-08-17 23:46:02'),(42,145,NULL,8,'Tạo Hóa Đơn Thành Công','2023-08-17 23:47:02'),(43,144,NULL,8,'Đơn Hàng Đã Bị Xóa','2023-08-17 23:48:30'),(44,145,NULL,8,'Đơn Hàng Đã Bị Xóa','2023-08-17 23:48:33'),(45,146,NULL,8,'Tạo Hóa Đơn Thành Công','2023-08-17 23:51:19'),(46,146,NULL,0,'Tạo Đơn Hàng Ship Thành Công','2023-08-17 23:52:30'),(47,146,NULL,1,'OK','2023-08-17 23:52:40'),(48,146,NULL,2,'OK','2023-08-17 23:52:45'),(49,146,NULL,3,'OK','2023-08-17 23:52:50'),(50,146,NULL,4,'Thanh Toán Thành Công','2023-08-17 23:53:41'),(51,146,NULL,5,'Ổn','2023-08-17 23:54:00'),(52,147,NULL,8,'Tạo Hóa Đơn Thành Công','2023-10-06 21:29:04'),(53,148,NULL,8,'Tạo Hóa Đơn Thành Công','2023-10-06 21:30:16');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mau_sac`
--

LOCK TABLES `mau_sac` WRITE;
/*!40000 ALTER TABLE `mau_sac` DISABLE KEYS */;
INSERT INTO `mau_sac` VALUES (4,'MS01','Mau Do',0),(5,'MS01','Mau Xanh',0);
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
  `id_ms` int DEFAULT NULL,
  `id_loaisp` int DEFAULT NULL,
  `id_xx` int DEFAULT NULL,
  `id_tay_ao` int DEFAULT NULL,
  `id_co_ao` int DEFAULT NULL,
  `mo_ta` varchar(225) DEFAULT NULL,
  `gia_nhap` decimal(38,2) DEFAULT NULL,
  `gia_ban` decimal(38,2) DEFAULT NULL,
  `trang_thai` int DEFAULT NULL,
  PRIMARY KEY (`id_sp`),
  KEY `id_cl_idx` (`id_cl`),
  KEY `id_ms_idx` (`id_ms`),
  KEY `id_loaisp_idx` (`id_loaisp`),
  KEY `id_tay_ao_idx` (`id_tay_ao`),
  KEY `id_xx_idx` (`id_xx`),
  KEY `id_co_ao_idx` (`id_co_ao`),
  CONSTRAINT `id_cl` FOREIGN KEY (`id_cl`) REFERENCES `chat_lieu` (`id_cl`),
  CONSTRAINT `id_co_ao` FOREIGN KEY (`id_co_ao`) REFERENCES `loai_co_ao` (`id_co_ao`),
  CONSTRAINT `id_loaisp` FOREIGN KEY (`id_loaisp`) REFERENCES `loai_sp` (`id_loaisp`),
  CONSTRAINT `id_ms` FOREIGN KEY (`id_ms`) REFERENCES `mau_sac` (`id_ms`),
  CONSTRAINT `id_tay_ao` FOREIGN KEY (`id_tay_ao`) REFERENCES `ong_tay_ao` (`id_tay_ao`),
  CONSTRAINT `id_xx` FOREIGN KEY (`id_xx`) REFERENCES `xuat_xu` (`id_xx`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `san_pham`
--

LOCK TABLES `san_pham` WRITE;
/*!40000 ALTER TABLE `san_pham` DISABLE KEYS */;
INSERT INTO `san_pham` VALUES (5,'SP01','Quan Lolicon',11,4,4,17,1,1,'Xau',5000.00,116000.00,0),(6,'SP02','Ao Kakame',12,5,5,102,2,2,'Moi',1000.00,155000.00,0),(7,'SP03','Quan Hoho',13,4,4,105,1,1,'Haha',7820.00,145000.00,0),(8,'SP03','HDHDHD',12,4,5,17,1,2,'fghjkl',NULL,340000.00,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_khoan`
--

LOCK TABLES `tai_khoan` WRITE;
/*!40000 ALTER TABLE `tai_khoan` DISABLE KEYS */;
INSERT INTO `tai_khoan` VALUES (1,1,'TK01','Nguyen','Nghia',NULL,'nghiacoivipne@gmail.com','0337842655','123456',0),(2,8,'TK02','Nguyen','Van Hung',NULL,'nguyenvanhung@gmail.com','0578267849','465789',0),(3,9,'TK03','Hoang','Nam',NULL,'nguyenVanA@gmail.com','0578694258','123456',0),(4,9,'TK04','Nguyen','Huy Cuong',NULL,'nguyenVanB@gmail.com','0206070809','258479',0),(5,9,'TK05','Nguyen','Hoang Yen',NULL,'nguyenVanC@gmail.com','0708681458','147895',0),(6,9,'TK06','Ta','Dinh Nam',NULL,'nguyenVanD@gmail.com','0802147869','125789',0);
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

-- Dump completed on 2023-10-10 22:00:57
