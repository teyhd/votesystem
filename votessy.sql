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


-- Дамп структуры базы данных votesys
CREATE DATABASE IF NOT EXISTS `votesys` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `votesys`;

-- Дамп структуры для таблица votesys.auten
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы votesys.auten: ~78 rows (приблизительно)
INSERT INTO `auten` (`id`, `sesid`, `ip`, `devtype`, `height`, `width`, `nameid`, `time`) VALUES
	(1, 'Z1jDfNszeXGuFQe7UegncNet0pN2Bf_g', '1', 'desktop', '1080', '1920', -1, 1663851387),
	(2, '17UrUqyn_JMqzrP-FuujVXa75Pzs0Hmy', '1', 'desktop', '1080', '1920', 1, 1663859236),
	(3, '1jkipVGR3bXAV1T_A5CnOWeXfkq02q_f', '1', 'desktop', '1080', '1920', 1, 1663859393),
	(4, '5wPzdeztgrndRQq9xwGgNB5XEdsMWcvl', '1', 'desktop', '1080', '1920', 1, 1663861383),
	(5, 'Uywaz5Vm8Fy-GjfQf1ujLk-RZTszCqes', '1', 'desktop', '1080', '1920', 1, 1663861766),
	(6, 'ZnQZ4DJMZn8fA3TNkQNtB1URKXMfWq4Y', '1', 'desktop', '1080', '1920', 1, 1663861824),
	(7, 'eNYCfduMB09hl1rDT4YRh5CbAbsSAG3a', '1', 'desktop', '1080', '1920', 1, 1663861858),
	(8, 'MN3cTa9Lz3QUkC2jcqBWzjAHxV_UVH6Q', '1', 'desktop', '1080', '1920', 1, 1663861874),
	(9, 'gNYB0ryypBw-AP27hP92GMntsuov6UVw', '1', 'desktop', '1080', '1920', 1, 1663861913),
	(10, 'xgLU9IePbsbUMeqzgjNc_f81RsJmBVpZ', '1', 'desktop', '1080', '1920', 1, 1663861946),
	(11, 'Tv0VnEzU1yDYytWJpBA3s2qLsy-qd5FT', '1', 'desktop', '1080', '1920', 1, 1663861978),
	(12, '8ZfJiG-U7FH92D85Jj2_dib4hEvE2_Co', '1', 'desktop', '1080', '1920', 1, 1663862018),
	(13, 'a6fEFfu-cpA3CRH9ATuAPPQ_qJJVspG_', '1', 'desktop', '1080', '1920', 1, 1663863206),
	(14, 'OKIu6RgeSXNjPISBt89KIsrbRa-ipyCT', '10.1.120.132', 'mobile', '873', '393', 1, 1663863686),
	(15, 'FMSF1pN6yd4kvP9qs_635NYFJPCpmaQ_', '10.1.120.132', 'mobile', '873', '393', -1, 1663863701),
	(16, 'xkqhw88WMsJAPpjpKlMQQaqnULu4UAOf', NULL, NULL, NULL, NULL, -1, 1663913526),
	(17, '94elsxRbnB8goFCporqOQ2DymC8gVNj-', '1', 'desktop', '1080', '2048', -1, 1663913526),
	(18, 'NQXa5S-sLGNmpd55CNk5L3ijsAsZevbf', '1', 'desktop', '1080', '1920', 1, 1663914271),
	(19, '-GB2vod5tqr9cuIaduFcmGPgQuAK-OFE', '1', 'desktop', '1080', '2048', 1, 1663914671),
	(20, 'MOeObw6tdxeZfSPGKvEaZAeLHWSUczgB', '10.1.96.243', 'mobile', '873', '393', 1, 1663914396),
	(21, 'CBcFEr7zDrR9mmcpyj-YX20DYd8XCCTZ', '1', 'desktop', '1080', '1920', 1, 1663921606),
	(22, 'nLS7blhFx3T9QENvjOq3neMi7H03Dmne', '1', 'desktop', '1080', '1920', -1, 1663923253),
	(23, 'Qafrjm8Fr6P0BbW0-4pdMmStqUXlDFoB', '10.1.96.242', 'tablet', '1024', '768', 1, 1663927019),
	(24, 'FsrMilK8Ee1Nq1v8QR6DZZHpucUFl_Dm', '10.1.121.99', 'mobile', '873', '393', -1, 1663924077),
	(25, 'odW7ILvwAKU-rkFLsNlHpnP_kH6xG8mL', '10.1.121.99', 'mobile', '873', '393', 1, 1663924207),
	(26, '3-d8BIVbJ2hum752-FXdyYkoQ6MskvlQ', '10.1.121.99', 'mobile', '873', '393', 1, 1663926092),
	(27, 'FwOPV27Zqvdv5JNNX79Oxap0FQRcdn7X', '1', 'desktop', '1080', '1920', 1, 1663927360);

-- Дамп структуры для представление votesys.film
-- Создание временной таблицы для обработки ошибок зависимостей представлений
CREATE TABLE `film` (
	`id` INT(10) NOT NULL,
	`pku` TEXT NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`film` TEXT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`type` INT(10) NULL
) ENGINE=MyISAM;

-- Дамп структуры для таблица votesys.films
CREATE TABLE IF NOT EXISTS `films` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pku_id` int DEFAULT NULL,
  `film` text,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Дамп данных таблицы votesys.films: ~73 rows (приблизительно)
INSERT INTO `films` (`id`, `pku_id`, `film`, `type`) VALUES
	(1, 1, 'Письмо чемпиону', 0),
	(2, 2, 'Почер…детский', 0),
	(3, 3, 'Таёжный гамбит', 0),
	(4, 4, 'Вемол', 0),
	(5, 5, 'Зачет', 0),
	(6, 6, 'Первый шаг', 0),
	(7, 7, 'Капсула времени', 0),
	(8, 8, '', 0),
	(9, 9, 'Отражение', 0),
	(10, 10, 'Есть, чем гордиться!', 0),
	(11, 11, 'Из глубины веков', 0),
	(12, 12, 'Старший брат', 0),
	(13, 13, 'Кадетский лайфхак', 0),
	(14, 14, 'Дулаг 205', 0),
	(15, 15, 'Не совпадение, а отражение', 0),
	(16, 16, 'Послание человеку', 0),
	(17, 17, 'Без вести пропавшее училище', 0),
	(18, 18, 'Приказано выжить', 0),
	(19, 19, 'Командовать парадом буду я!', 0),
	(20, 20, 'Суворовец - это особое звание!', 0),
	(21, 21, 'Наука веровать - наука побеждать!', 0),
	(22, 22, 'Урок Миролюбия', 0),
	(23, 23, 'Однажды', 0),
	(24, 24, 'Выбор', 0),
	(25, 25, 'Ваня и котенок ', 0),
	(26, 26, 'Первые', 0),
	(27, 27, 'ЖИЛ-БЫЛ', 0),
	(28, 28, 'Приключения Петра Первого в Санкт-Петербурге', 0),
	(29, 29, 'ЗОНА 100 или синий чемодан господина Наито', 0),
	(30, 30, 'Кладоискатели', 0),
	(31, 31, 'Следы на горячем песке', 0),
	(32, 32, 'Флешка', 0),
	(33, 1, 'Мы помним', 1),
	(34, 3, 'Хоомей – душа народа', 1),
	(35, 6, 'Сохранить дух Родины', 1),
	(36, 13, 'Дети Донбасса', 1),
	(37, 26, 'Путями русского офицера', 1),
	(38, 28, 'Символ веры', 1),
	(39, 29, 'Свет родного причала', 1),
	(40, 30, '…по нотам 42-го', 1),
	(41, 5, 'Среда воспитания', 2),
	(42, 6, 'Разрушители мифов', 2),
	(43, 28, '"Из ""маркизовой лужи"" к Южному материку"', 2),
	(44, 21, 'Будущее за нами!', 2),
	(45, 22, 'Загадка Галиата', 2),
	(46, 9, 'Сила в женщине', 2),
	(47, 2, 'Кто главнее', 3),
	(48, 16, '"""В бою ничьих не бывает"" по новелле Енгибарова Леонида"', 3),
	(49, 18, 'Сказка о храбром зайце', 3),
	(50, 24, 'Подслушанный разговор', 3),
	(51, 31, 'Хранители города', 3),
	(52, 1, 'Я-русский', 4),
	(53, 4, 'Пехота наркомафии', 4),
	(54, 5, 'Своих не бросаем!', 4),
	(55, 7, 'Иная планета', 4),
	(56, 15, 'Сделай выбор правильно', 4),
	(57, 17, 'Буду офицерам', 4),
	(58, 18, 'Наше Отечетсво - Россия', 4),
	(59, 19, 'Пешеход! Освети себя!', 4),
	(60, 25, 'Мама, я тебя люблю', 4),
	(61, 26, 'Спасибо докторам', 4),
	(62, 23, 'Жизнь', 4),
	(63, 2, 'Ойся, ты ойся', 5),
	(64, 3, 'Кадет – он завтра офицер', 5),
	(65, 4, 'Бросок на небеса', 5),
	(66, 7, 'Тишина', 5),
	(67, 9, 'Эх, дороги', 5),
	(68, 10, 'Наш край - Россия', 5),
	(69, 11, 'Веселый ветер', 5),
	(70, 12, 'Мой Петербург', 5),
	(71, 15, 'Тебе поем, Отечество!', 5),
	(72, 19, 'Генералиссимус Суворов', 5),
	(73, 20, 'Страна, огромная как детство', 5),
	(74, 21, 'Это наша земля', 5),
	(75, 22, 'Тебе поем, Отечество!', 5),
	(76, 23, 'Великаны', 5),
	(77, 24, 'Майский вальс', 5),
	(78, 25, 'За того парня', 5),
	(79, 27, 'Потому что я русский по духу!', 5),
	(80, 29, 'Я поднимаю свой флаг!', 5),
	(81, 30, 'Нахимовский вальс', 5),
	(82, 31, 'Тебе поем, Отечество!', 5),
	(83, 32, 'Мурманск', 5);

-- Дамп структуры для таблица votesys.pku
CREATE TABLE IF NOT EXISTS `pku` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pku` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Дамп данных таблицы votesys.pku: ~32 rows (приблизительно)
INSERT INTO `pku` (`id`, `pku`) VALUES
	(1, 'Кемеровское президентское кадетское училище\r'),
	(2, 'Краснодарское президентское кадетское училище\r'),
	(3, 'Кызылское президентское кадетское училище\r'),
	(4, 'Оренбургское президентское кадетское училище\r'),
	(5, 'Петрозаводское президентское кадетское училище\r'),
	(6, 'Ставропольское президентское кадетское училище\r'),
	(7, 'Тюменское президентское кадетское училище\r'),
	(8, 'Московский кадетский корпус «Пансион воспитанниц Министерства обороны Российской Федерации»\r'),
	(9, 'Санкт-Петербургский кадетский корпус «Пансион воспитанниц Министерства обороны Российской Федерации»\r'),
	(10, 'Аксайский Данилы Ефремова казачий кадетский корпус\r'),
	(11, 'Кронштадтский морской кадетский военный корпус\r'),
	(12, 'Санкт-Петербургский кадетский военный корпус имени князя Александра Невского\r'),
	(13, 'Омский кадетский военный корпус\r'),
	(14, 'Кадетский корпус (инженерная школа) ВУНЦ ВВС «Военно-воздушная академия им. профессора Н.Е. Жуковского и Ю.А. Гагарина»\r'),
	(15, 'Кадетский корпус (спортивная школа) Военного института физической культуры\r'),
	(16, 'Кадетский корпус (школа IT-технологий) Военной академии связи имени Маршала Советского Союза С.М. Буденного\r'),
	(17, 'Екатеринбургское суворовское военное училище\r'),
	(18, 'Казанское суворовское военное училище\r'),
	(19, 'Московское суворовское военное училище\r'),
	(20, 'Пермское суворовское военное училище\r'),
	(21, 'Санкт-Петербургское суворовское военное училище\r'),
	(22, 'Северо-Кавказское суворовское военное училище\r'),
	(23, 'Тверское суворовское военное училище\r'),
	(24, 'Тульское суворовское военное училище\r'),
	(25, 'Ульяновское гвардейское суворовское военное училище\r'),
	(26, 'Уссурийское суворовское военное училище\r'),
	(27, 'Московское военно-музыкальное училище имени генерал-лейтенанта В.М.Халилова\r'),
	(28, 'Нахимовское военно-морское училище\r'),
	(29, 'Филиал Нахимовского военно-морского училища (Владивостокское президентские кадетское училище)\r'),
	(30, 'Филиал Нахимовского военно-морского училища (Севастопольское президентские кадетское училище)\r'),
	(31, 'Филиал Нахимовского военно-морского училища в г. Калининграде\r'),
	(32, 'Филиал Нахимовского военно-морского училища в г. Мурманске\r');

-- Дамп структуры для таблица votesys.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `adlogin` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `role` int NOT NULL DEFAULT '1',
  `lastseen` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Дамп данных таблицы votesys.users: ~1 rows (приблизительно)
INSERT INTO `users` (`id`, `name`, `adlogin`, `role`, `lastseen`) VALUES
	(1, 'Дьяконов В.С.', 'v.diakonov', 0, 1663926927),
	(2, 'Алимов Л. А. ', 'L.Alimov', 0, 0),
	(3, 'Куликович О.Б.', 'O.Kulikovich', 0, 0),
	(4, 'Снежкин С.О.', 'S.Snezhkin', 0, 0),
	(5, 'Усатова Н.Н.', 'N.Usatova', 0, 0),
	(6, 'Носков А.А', 'A.Noskov', 0, 0),
	(7, 'Бокашевская Г.А', 'G.Bokashevskaya', 0, 0),
	(8, 'Федорцов А.А', 'A.Fedorcov', 0, 0),
	(9, 'Колганов В.В', 'V.Kolganov', 0, 0),
	(10, 'Поздняков А. Н.', 'A.Pozdnyakov', 1, 0),
	(11, 'Дворкин Б.Г.', 'B.Dvorkin', 1, 0),
	(12, 'Блинов А.В.', 'A.Blinov', 1, 0),
	(13, 'Иванов А.Ю', 'A.Ivanov', 1, 0),
	(14, 'Гаврило М.В', 'M.Gavrilo', 1, 0),
	(15, 'Никулин А.', 'A.Nikulin', 1, 0),
	(16, 'Иванчук В.В.', 'V.Ivanchuk', 1, 0),
	(17, 'Дунаева О.В.', 'O.Dunaeva', 2, 0),
	(18, 'Радин А.А.', 'A.Radin', 2, 0),
	(19, 'Сидельников И.А.', 'I.Sidelnikov', 2, 0),
	(20, 'Дьякова М.Ю.', 'M.D\'yakova', 2, 0),
	(21, 'Ордян А.', 'A.Ordyan', 2, 0),
	(22, 'Гребенникова И. Ю.', 'I.Grebennikova', 3, 0),
	(23, 'Рой О.Ю.', 'O.Roj', 3, 0),
	(24, 'Стремина М. ', 'M.Stremina', 3, 0),
	(25, 'Гучковская Л. В.', 'L.Guchkovskaya', 3, 0),
	(26, 'Стрижак В.Н.', 'V.Strizhak', 4, 0),
	(27, 'Емельянова А. В.', 'A.Emelyanova', 4, 0),
	(28, 'Якунин М.Н.', 'M.YAkunin', 4, 0),
	(29, 'Дмитриева Ю.Р.', 'U.Dmitrieva', 4, 0),
	(30, 'Никифорова С. Б.', 'S.Nikiforova', 4, 0),
	(31, 'Рыжкова Т.В.', 'T.Ryzhkova', 5, 0),
	(32, 'Морозова Н.Б.', 'N.Morozova', 5, 0),
	(33, 'Косинский А.Ю.', 'A.Kosinskij', 5, 0),
	(34, 'Корнеева К.Д.', 'K.Korneeva', 5, 0),
	(35, 'Артамонова К.А.', 'K.Artamonova', 5, 0),
	(36, 'Кузнецова Е.О.', 'E.Kuznecova', 5, 0),
	(37, 'Воуба В.Г.', 'V.Vouba', 5, 0),
	(38, 'Витовцев В.', 'V.Vitovcev', 5, 0);

-- Дамп структуры для таблица votesys.vote
CREATE TABLE IF NOT EXISTS `vote` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nameid` int NOT NULL,
  `filmid` int NOT NULL,
  `janr` tinyint NOT NULL DEFAULT '0',
  `dram` tinyint NOT NULL DEFAULT '0',
  `actu` tinyint NOT NULL DEFAULT '0',
  `orig` tinyint NOT NULL DEFAULT '0',
  `soder` tinyint NOT NULL DEFAULT '0',
  `hyd` tinyint NOT NULL DEFAULT '0',
  `tex` tinyint NOT NULL DEFAULT '0',
  `vira` tinyint NOT NULL DEFAULT '0',
  `time` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Дамп данных таблицы votesys.vote: ~1 rows (приблизительно)
INSERT INTO `vote` (`id`, `nameid`, `filmid`, `janr`, `dram`, `actu`, `orig`, `soder`, `hyd`, `tex`, `vira`, `time`) VALUES
	(1, 1, 1, 3, 6, 0, 0, 0, 3, 4, 5, 1663926955);

-- Дамп структуры для представление votesys.film
-- Удаление временной таблицы и создание окончательной структуры представления
DROP TABLE IF EXISTS `film`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `film` AS select `films`.`id` AS `id`,`pku`.`pku` AS `pku`,`films`.`film` AS `film`,`films`.`type` AS `type` from (`films` join `pku` on((`films`.`pku_id` = `pku`.`id`)));

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
