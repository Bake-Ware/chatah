/*
SQLyog Community v11.31 (32 bit)
MySQL - 5.5.9 : Database - chat
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`chat` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `chat`;

/*Table structure for table `chat` */

DROP TABLE IF EXISTS `chat`;

CREATE TABLE `chat` (
  `user` varchar(50) NOT NULL,
  `message` text,
  `timestamp` datetime NOT NULL,
  `url` text,
  `file` text,
  `misc` text,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(100) DEFAULT 'php',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=67793 DEFAULT CHARSET=latin1;

/*Table structure for table `memchat` */

DROP TABLE IF EXISTS `memchat`;

CREATE TABLE `memchat` (
  `user` varchar(50) NOT NULL,
  `message` varchar(8000) DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  `url` varchar(8000) DEFAULT NULL,
  `file` varchar(8000) DEFAULT NULL,
  `misc` varchar(8000) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `source` varchar(100) DEFAULT 'php'
) ENGINE=MEMORY DEFAULT CHARSET=latin1;

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `username` varchar(1000) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `online` int(1) DEFAULT NULL,
  `prefs` varchar(1000) DEFAULT NULL,
  `alias` varchar(8000) DEFAULT NULL,
  `avatar` varchar(8000) NOT NULL DEFAULT 'images/chat.png',
  `lastpost` datetime DEFAULT NULL,
  `alive` datetime NOT NULL,
  `admin` int(11) NOT NULL DEFAULT '0',
  `barvatar` varchar(1000) DEFAULT 'images/chat.png',
  `email` varchar(1000) DEFAULT NULL,
  `score` bigint(20) NOT NULL DEFAULT '0',
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Table structure for table `vw_users` */

DROP TABLE IF EXISTS `vw_users`;

/*!50001 DROP VIEW IF EXISTS `vw_users` */;
/*!50001 DROP TABLE IF EXISTS `vw_users` */;

/*!50001 CREATE TABLE  `vw_users`(
 `username` varchar(1000) ,
 `online` int(1) 
)*/;

/*View structure for view vw_users */

/*!50001 DROP TABLE IF EXISTS `vw_users` */;
/*!50001 DROP VIEW IF EXISTS `vw_users` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_users` AS select `users`.`username` AS `username`,if((`users`.`alias` = 'm'),3,if(((`users`.`alive` <= (now() - interval 5 minute)) or (`users`.`alive` = NULL)),0,if((`users`.`lastpost` <= (now() - interval 5 hour)),0,if((`users`.`lastpost` <= (now() - interval 15 minute)),2,if((`users`.`online` = 0),0,1))))) AS `online` from `users` */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
