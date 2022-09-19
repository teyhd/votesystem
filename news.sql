-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               8.0.20 - MySQL Community Server - GPL
-- Операционная система:         Win64
-- HeidiSQL Версия:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Дамп структуры базы данных newstest
CREATE DATABASE IF NOT EXISTS `newstest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `newstest`;

-- Дамп структуры для таблица newstest.auten
CREATE TABLE IF NOT EXISTS `auten` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sesid` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `ip` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `devtype` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `height` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `width` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `nameid` int NOT NULL DEFAULT '-1',
  `time` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица newstest.news
CREATE TABLE IF NOT EXISTS `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `head` text CHARACTER SET utf8,
  `cont` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `autor` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `status` int DEFAULT NULL,
  `mpdate` int NOT NULL,
  `date` int NOT NULL,
  `path` text CHARACTER SET utf8,
  `comment` text CHARACTER SET utf8,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица newstest.pict
CREATE TABLE IF NOT EXISTS `pict` (
  `id` int NOT NULL AUTO_INCREMENT,
  `newsid` int NOT NULL DEFAULT '-1',
  `pict` text CHARACTER SET utf8 NOT NULL,
  `types` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT ' ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица newstest.status
CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `types` tinyint NOT NULL DEFAULT '0',
  `hisid` smallint NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '-1',
  `nameid` int NOT NULL DEFAULT '0',
  `time` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица newstest.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_unicode_ci,
  `adlogin` text COLLATE utf8mb4_unicode_ci,
  `role` int NOT NULL DEFAULT '1',
  `lastseen` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Экспортируемые данные не выделены.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
