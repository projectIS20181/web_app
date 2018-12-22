-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: job_solution
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `candidate` (
  `candidate_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id_fk` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `gender` tinyint(5) DEFAULT '0',
  `birthday` date DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `career_info_id_fk` int(11) DEFAULT '0',
  PRIMARY KEY (`candidate_id`),
  KEY `Candidate_user_id_fk` (`user_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES (1,1,'nghia','duong trung',0,NULL,'1232214155',NULL,4);
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_recruitment`
--

DROP TABLE IF EXISTS `candidate_recruitment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `candidate_recruitment` (
  `candidate_recruitment_id` int(11) NOT NULL AUTO_INCREMENT,
  `candidate_id_fk` int(11) NOT NULL,
  `recruitment_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`candidate_recruitment_id`),
  KEY `Candidate_recruitment_candidate_id_fk` (`candidate_id_fk`),
  KEY `Candidate_recruitment_recruitment_id_fk` (`recruitment_id_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_recruitment`
--

LOCK TABLES `candidate_recruitment` WRITE;
/*!40000 ALTER TABLE `candidate_recruitment` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidate_recruitment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `career_info`
--

DROP TABLE IF EXISTS `career_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `career_info` (
  `career_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `industry_id_fk` int(11) NOT NULL DEFAULT '0',
  `career_goal` text NOT NULL,
  `min_salary` float NOT NULL,
  `max_salary` float NOT NULL,
  `salary_type` tinyint(10) NOT NULL,
  `job_type` tinyint(10) NOT NULL COMMENT 'Full, part, intern, contract',
  `position` varchar(255) NOT NULL,
  `experience` tinyint(10) NOT NULL COMMENT 'by year',
  `degree` tinyint(10) NOT NULL COMMENT 'highschool, college...',
  `foreign_lang` tinyint(10) NOT NULL,
  `level_foreign_lang` tinyint(10) NOT NULL,
  `resume_link` varchar(255) NOT NULL,
  PRIMARY KEY (`career_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='asdfa';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `career_info`
--

LOCK TABLES `career_info` WRITE;
/*!40000 ALTER TABLE `career_info` DISABLE KEYS */;
INSERT INTO `career_info` VALUES (4,1,'Ta la Nghia day',700,1500,3,1,'Developer',3,0,0,0,'this_is_a_link');
/*!40000 ALTER TABLE `career_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `total_employee` varchar(255) NOT NULL COMMENT 'from-to',
  `intro` text NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'LOREMMMMMM','200-250','Lorem ipsum dolor sit amet, consectetur adipiscing elit.','https://images.pexels.com/photos/1656434/pexels-photo-1656434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','https://images.pexels.com/photos/1656434/pexels-photo-1656434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','Ha noi'),(17,'Lorem Company','300','Lorem Lorem Lorem LoremLoremLoremLoremLoremLoremLoremLoremLorem',NULL,NULL,NULL),(18,'ha noi','ít hơn 10','11111111111',NULL,NULL,NULL),(19,'ha noi','25-99','aoeiaaaaaaaaaaa',NULL,NULL,NULL),(20,'ha noi','25-99','aoeiaaaaaaaaaaa',NULL,NULL,NULL),(21,'ha noi','10-20','Công ty Cổ Phần Nguồn Nhân Lực Siêu Việt\r\nTrụ Sở: Tòa nhà Siêu Việt, 23 Trần Cao Vân, Phường Đa Kao, Quận 1, TP Hồ Chí Minh\r\n\r\nChi nhánh: Tầng 9, Tòa nhà Center Building, Số 1 Nguyễn Huy Tưởng, Quận Thanh Xuân, Hà Nội\r\n\r\nĐiện thoại: (028) 7309 8888 | (024) 7309 8888',NULL,NULL,NULL),(22,'luci','10-20','Cong ty chuyen ve IOT',NULL,NULL,NULL);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_candidate`
--

DROP TABLE IF EXISTS `company_candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company_candidate` (
  `company_candidate_id` int(11) NOT NULL AUTO_INCREMENT,
  `candidate_id_fk` int(11) NOT NULL,
  `company_id_fk` int(11) NOT NULL,
  `type` tinyint(10) NOT NULL COMMENT 'who follow whom',
  PRIMARY KEY (`company_candidate_id`),
  KEY `Company_company_id_fk` (`company_id_fk`),
  KEY `Candidate_candidate_id_fk` (`candidate_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_candidate`
--

LOCK TABLES `company_candidate` WRITE;
/*!40000 ALTER TABLE `company_candidate` DISABLE KEYS */;
INSERT INTO `company_candidate` VALUES (1,1,1,2);
/*!40000 ALTER TABLE `company_candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_user`
--

DROP TABLE IF EXISTS `company_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company_user` (
  `company_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id_fk` int(11) NOT NULL,
  `user_id_fk` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL COMMENT 'Vi tri cong viec',
  `website_link` varchar(255) DEFAULT NULL,
  `facebook_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_user_id`),
  KEY `Company_company_user_id_fk` (`company_id_fk`),
  KEY `user_company_user_id_fk` (`user_id_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_user`
--

LOCK TABLES `company_user` WRITE;
/*!40000 ALTER TABLE `company_user` DISABLE KEYS */;
INSERT INTO `company_user` VALUES (1,1,2,'Toi ten la','Nghia','Lorem ipsum dolor sit amet, consectetur adipiscing elit.','973193131','Truong phong nhan su','https://images.pexels.com/photos/1656434/pexels-photo-1656434.jpeg','https://images.pexels.com/photos/1656434/pexels-photo-1656434.jpeg'),(13,17,29,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,18,30,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,19,31,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,20,32,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,21,33,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,22,34,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `company_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industry`
--

DROP TABLE IF EXISTS `industry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `industry` (
  `industry_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`industry_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industry`
--

LOCK TABLES `industry` WRITE;
/*!40000 ALTER TABLE `industry` DISABLE KEYS */;
INSERT INTO `industry` VALUES (1,'Tiếp thị / Marketing'),(2,'Bán lẻ / Bán sỉ'),(3,'Bán hàng / Kinh doanh'),(4,'Tiếp thị trực tuyến'),(5,'Dược phẩm'),(6,'Y tế / Chăm sóc sức khỏe'),(7,'Tư vấn'),(8,'Dịch vụ khách hàng'),(9,'Luật / Pháp lý'),(10,'Bưu chính viễn thông'),(11,'Giáo dục / Đào tạo'),(12,'An Ninh / Bảo Vệ'),(13,'Giáo dục / Đào tạo'),(14,'Hành chính / Thư ký'),(15,'Quản lý điều hành'),(16,'Nhân sự'),(17,'Biên phiên dịch'),(18,'Kế toán / Kiểm toán'),(19,'Ngân hàng'),(20,'Bảo hiểm'),(21,'CNTT - Phần mềm'),(22,'CNTT - Phần cứng / Mạng');
/*!40000 ALTER TABLE `industry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recruitment`
--

DROP TABLE IF EXISTS `recruitment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `recruitment` (
  `recruitment_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id_fk` int(11) NOT NULL,
  `industry_id_fk` int(11) NOT NULL COMMENT 'Ngành nghề',
  `work_id` varchar(255) NOT NULL COMMENT 'Mã công việc',
  `work_name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL COMMENT 'Vị trí tuyển dụng',
  `description` longtext NOT NULL COMMENT 'Mô Tả Công Việc ',
  `requirement` longtext NOT NULL COMMENT 'Yêu cầu công việc',
  `location` varchar(255) NOT NULL,
  `min_salary` float NOT NULL,
  `max_salary` float NOT NULL,
  `min_age` int(11) NOT NULL,
  `max_age` int(11) NOT NULL,
  `type_salary` tinyint(10) NOT NULL COMMENT 'Xem constant.js',
  `type_candidate` tinyint(10) DEFAULT NULL COMMENT 'Xem constant.js',
  `gender_requirement` tinyint(10) NOT NULL,
  `deadline` date DEFAULT NULL COMMENT 'Hạn nhận hồ sơ',
  `job_tags` text NOT NULL,
  `type_post` tinyint(10) NOT NULL COMMENT 'Xem constant.js',
  `total_rating` float NOT NULL DEFAULT '0',
  `rating_quantity` int(11) NOT NULL DEFAULT '0',
  `deleted` tinyint(2) NOT NULL DEFAULT '0' COMMENT 'Xem constant.js',
  PRIMARY KEY (`recruitment_id`),
  KEY `Company_recruitment_company_id_fk` (`company_id_fk`),
  KEY `Recruitment_industry_id_fk` (`industry_id_fk`),
  CONSTRAINT `Recruitment_industry_id_fk` FOREIGN KEY (`industry_id_fk`) REFERENCES `industry` (`industry_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recruitment`
--

LOCK TABLES `recruitment` WRITE;
/*!40000 ALTER TABLE `recruitment` DISABLE KEYS */;
INSERT INTO `recruitment` VALUES (1,1,2,'2AWDSF','Lap trinh web','Lorem ipsum','Lorem ipsum Lorem ipsum Lorem ipsum','12321 Lorem ipsum Lorem ipsum Lorem ipsum','Ha noi',700,1000,22,25,3,1,0,NULL,'[\"lap trinh vien\", \"computer science\", \"mobile developer\"]',1,7.5,3,0),(2,1,2,'hahaha','Da xoa Da xoa','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','Ho Chi Minh',0,0,0,0,0,NULL,0,NULL,'[\"lap trinh vien\", \"computer science\", \"mobile developer\"]',0,7.5,3,1),(3,1,1,'10001','Nhân Viên Kinh Doanh Bất Động Sản','Nhân Viên Kinh Doanh Bất Động Sản','- Chăm sóc những khách hàng do công ty cung cấp.\r\n- Tìm kiếm, phát triển khách hàng qua các kênh Marketing, học hỏi để trở thành chuyên viên cao cấp, chuyên nghiệp\r\n- Tư vấn, giới thiệu đến khách hàng về các dự án của công ty đang phân phối.\r\n- Hỗ trợ khách hàng các thủ tục mua bán căn hộ.','- Đã tốt nghiệp trung cấp trở lên.\r\n- Không yêu cầu kinh nghiệm, chỉ cần nhiệt huyết và năng động;\r\n- Thành thạo tin học văn phòng, internet.\r\n- Có phương tiện đi lại, laptop, điện thoại\r\n- Kỹ năng giao tiếp, thuyết trình, không nói ngọng.\r\n- Có tinh thần cầu tiến, năng động, tự tin\r\n- Ưu tiên đam mê kinh doanh, chưa biết nghề Bất động sản ( Công ty sẽ đào tạo miễn phí)','hà nội',8000000,14000000,0,0,2,1,2,'2019-01-02','bất động sản',1,0,0,0),(4,1,1,'1997','Lap trinh front-end','Develop','Lap trinh các ứng dụng mobile app','6 tháng kinh nghiệm\r\nBiết về JS, HTML, ...','Hà Nội',1000,1200,0,0,3,1,2,'2019-10-15','nhân viên chính thức',1,0,0,0);
/*!40000 ALTER TABLE `recruitment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` tinyint(10) NOT NULL,
  `created_date` double NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'nghiadt','nghia@abc.com','202cb962ac59075b964b07152d234b70',1,1541518960),(2,'user_company','user_company@abc.com','202cb962ac59075b964b07152d234b70',2,1544234653),(29,'thang_1','test1@gmail.com','202cb962ac59075b964b07152d234b70',2,1545452229),(30,'','diepnguyengt12345@gmail.com','c4ca4238a0b923820dcc509a6f75849b',2,1545452254),(31,'','1diepnguyengt12345@gmail.com','c4ca4238a0b923820dcc509a6f75849b',2,1545452919),(32,'diepnguyengt12345@gmail.com','2diepnguyengt12345@gmail.com','c4ca4238a0b923820dcc509a6f75849b',2,1545453125),(33,'thắng','3diepnguyengt12345@gmail.com','202cb962ac59075b964b07152d234b70',2,1545460305),(34,'le trinh thanh','letrinhthanh45@gmail.com','202cb962ac59075b964b07152d234b70',2,1545463468);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-22 14:39:04
