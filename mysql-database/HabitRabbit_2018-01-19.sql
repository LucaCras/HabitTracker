# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.20)
# Database: HabitRabbit
# Generation Time: 2018-01-19 12:54:46 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table habits
# ------------------------------------------------------------

DROP TABLE IF EXISTS `habits`;

CREATE TABLE `habits` (
  `habit_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `duration` int(11) NOT NULL,
  `frequency` int(11) NOT NULL DEFAULT '1',
  `good` varchar(5) NOT NULL,
  `user_id` int(11) NOT NULL,
  `succesful` int(11) unsigned NOT NULL DEFAULT '0',
  `unsuccesful` int(11) unsigned NOT NULL DEFAULT '0',
  `complete` varchar(5) NOT NULL DEFAULT 'false',
  PRIMARY KEY (`habit_id`),
  UNIQUE KEY `habit_id_UNIQUE` (`habit_id`),
  KEY `FK_user_id_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `habits` WRITE;
/*!40000 ALTER TABLE `habits` DISABLE KEYS */;

INSERT INTO `habits` (`habit_id`, `name`, `duration`, `frequency`, `good`, `user_id`, `succesful`, `unsuccesful`, `complete`)
VALUES
	(1,'Hallo',230,3,'false',1,32,0,'false'),
	(2,'Dag',120,7,'true',3,0,0,'false'),
	(14,'go to the gym',42,1,'true',2,6,100,'false'),
	(15,'minder bier zuipen',120,7,'false',1,0,0,'false'),
	(16,'wqewe',12,1,'true',1,0,0,'false');

/*!40000 ALTER TABLE `habits` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;

INSERT INTO `sessions` (`session_id`, `expires`, `data`)
VALUES
	(X'333165545530626A4B6368655645686F326570534968433638636B64746F7663',1516452879,X'7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2270617373706F7274223A7B2275736572223A327D7D');

/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL DEFAULT 'he38u94eituhrfjkeuiht4ergjkfneiurhgdfjkwefsewrhofiqug42tbwrgiubq3',
  `user_created` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT 'active',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `user_created`, `status`)
VALUES
	(1,'Luca','Luca_Cras@hotmail.com','$2a$10$B2E5BYsjdcZX6aAt66bMnO9pd2cY.u2V.dVYlO9cYmWiO4yIfwZt2',NULL,'active'),
	(2,'asd','asd@hotmail.com','$2a$10$oPSI9BGxh4n9vxY62KWZU.QtK6SF0IidoXy13NuZ9oK/bNAVktvYS',NULL,'active'),
	(3,'Xx_PussyDestroyer_360_NoScope_xX','pd@hotmail.com','$2a$10$O4T4wnhE2bqz/BhtK6KBfut.Uacivle818skx7TmDv3zQjQX9wbw.',NULL,'active'),
	(4,'Ivor Zagorac','ivor.zagorac@hotmail.com','he38u94eituhrfjkeuiht4ergjkfneiurhgdfjkwefsewrhofiqug42tbwrgiubq3',NULL,'active');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
