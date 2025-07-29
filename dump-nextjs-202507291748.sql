-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: nextjs
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carttable`
--

DROP TABLE IF EXISTS `carttable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carttable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(11) DEFAULT NULL,
  `productName` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `imageUrl` varchar(500) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carttable`
--

LOCK TABLES `carttable` WRITE;
/*!40000 ALTER TABLE `carttable` DISABLE KEYS */;
INSERT INTO `carttable` VALUES (5,NULL,'安普里奥·阿玛尼（Emporio Armani）手表','男计时多功能商务防水生日七夕情人节礼物送男友电子石英男表 上新绿盘钢带 AR11529','https://www.xmaibu.com/public/uploads/cache/pic/attachment/image/EmporioArmani/ART3031-580x580.WEBP',26185.00,'2025-07-28 03:39:55');
/*!40000 ALTER TABLE `carttable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producttable`
--

DROP TABLE IF EXISTS `producttable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producttable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producttable`
--

LOCK TABLES `producttable` WRITE;
/*!40000 ALTER TABLE `producttable` DISABLE KEYS */;
INSERT INTO `producttable` VALUES (4,'香港轻奢品牌真皮包包女包托特包','2025新款大容量老花手提包斜跨包 咖啡色 子母包','https://cbu01.alicdn.com/img/ibank/O1CN01GekKLu1CHETL5XM8d_!!2122140055-0-cib.jpg',288.00,'2025-07-28 01:13:47'),(5,'安普里奥·阿玛尼（Emporio Armani）手表','男计时多功能商务防水生日七夕情人节礼物送男友电子石英男表 上新绿盘钢带 AR11529','https://www.xmaibu.com/public/uploads/cache/pic/attachment/image/EmporioArmani/ART3031-580x580.WEBP',26185.00,'2025-07-28 01:16:16'),(6,'GUCCI古驰GG羊毛结子绒提花上衣[新款]','浅粉色和白色 S','https://www.xmaibu.com/public/uploads/cache/pic/attachment/image/Gucci/579818_XKARR_9376-580x580.WEBP',9900.00,'2025-07-28 01:18:04'),(7,'哈苏（HASSELBLAD）X2D100C','中画幅微单相机1亿像素 哈苏X2D+XCD20-35+XCD35-75 标配','https://p0.itc.cn/q_70/images03/20220907/cb3dbb2a1e8e4cb0baeef7933f42c36f.jpeg',139987.00,'2025-07-28 01:20:24'),(8,'茅台（MOUTAI）24/25年飞天','53度 贵州飞天茅台 酱香型白酒 500ml（海外版带杯）','https://img14.360buyimg.com/pop/jfs/t1/127592/23/33452/132037/64350575Fa5b3d1c4/36a237e392a53ff7.jpg',1758.00,'2025-07-28 01:22:25'),(9,'周六福足金999黄金手镯','宝宝手镯可调节生日礼物计价AA101302约10.24g','https://imgservice.suning.cn/uimg1/b2c/image/wz7ma2QaPMfQf2FtD9M2wg.jpg',9875.00,'2025-07-28 01:24:58'),(10,'TCL电视雷鸟 雀4 25款','一级能效 55英寸 144Hz高刷 2+32GB 以旧换新家电国家补贴平板电视55F270C-JN','https://ts1.tc.mm.bing.net/th/id/OIP-C.Atzb01p_NjxXcLOOEq88ugHaIJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',7546.00,'2025-07-28 01:26:05'),(11,'联想拯救者Y9000P 2025','AI元启游戏笔记本电脑(Ultra9 275HX 32G1T RTX5060 2.5K240Hz 黑)国家补贴20%','https://doc-fd.zol-img.com.cn/t_s2000x2000/g7/M00/0B/09/ChMkK2gJNAuIUMTIAAFHErEoEnkAArjWAOTHikAAUcq147.png',13444.00,'2025-07-28 01:28:10');
/*!40000 ALTER TABLE `producttable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shippingtable`
--

DROP TABLE IF EXISTS `shippingtable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippingtable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `productName` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `imageUrl` varchar(500) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `trackingNumber` varchar(50) DEFAULT NULL,
  `shippingStatus` varchar(20) DEFAULT NULL,
  `shippingCompany` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippingtable`
--

LOCK TABLES `shippingtable` WRITE;
/*!40000 ALTER TABLE `shippingtable` DISABLE KEYS */;
INSERT INTO `shippingtable` VALUES (3,6,'那你','15777036095','GUCCI古驰GG羊毛结子绒提花上衣[新款]','浅粉色和白色 S','https://www.xmaibu.com/public/uploads/cache/pic/attachment/image/Gucci/579818_XKARR_9376-580x580.WEBP',9900.00,'','pending','',NULL);
/*!40000 ALTER TABLE `shippingtable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertable`
--

DROP TABLE IF EXISTS `usertable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(10) DEFAULT NULL,
  `password` varchar(16) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertable`
--

LOCK TABLES `usertable` WRITE;
/*!40000 ALTER TABLE `usertable` DISABLE KEYS */;
INSERT INTO `usertable` VALUES (1,'zzh','123456','15777036095','2025-07-02 15:41:31');
/*!40000 ALTER TABLE `usertable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'nextjs'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-29 17:48:28
