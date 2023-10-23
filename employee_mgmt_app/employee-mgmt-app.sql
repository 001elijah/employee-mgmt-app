SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `employee-mgmt-app` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `employee-mgmt-app`;

CREATE TABLE `roles` (
  `id` int UNSIGNED NOT NULL,
  `role` text COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `roles` (`id`, `role`) VALUES
(1, 'admin'),
(2, 'subadmin'),
(3, 'staff');

CREATE TABLE `statuses` (
  `id` int NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `statuses` (`id`, `status`) VALUES
(1, 'complete'),
(2, 'noncomplete'),
(3, 'paused');

CREATE TABLE `times` (
  `id` int NOT NULL,
  `employee_id` int NOT NULL,
  `time_in` time NOT NULL,
  `time_out` time NOT NULL,
  `total_hours` int NOT NULL,
  `date` date NOT NULL,
  `status_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(320) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` text COLLATE utf8_general_ci NOT NULL,
  `roles` text COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `times`
  ADD PRIMARY KEY (`id`),
  ADD KEY `1` (`employee_id`),
  ADD KEY `2` (`status_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `times`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;


ALTER TABLE `times`
  ADD CONSTRAINT `1` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `2` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;
