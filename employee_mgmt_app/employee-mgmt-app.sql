-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 02, 2023 at 12:28 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee-mgmt-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) UNSIGNED NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role`) VALUES
(1, 'admin'),
(2, 'subadmin'),
(3, 'staff');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(12) UNSIGNED NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'Bred C', 'bred@mail.com', 'scrypt:32768:8:1$en3YgCzOefoCHDgX$90dee35e13071fc5409e291e70bd4e9811a06be72d34e300133e9fdfb220fe43151de4a270ad9bf697b7bb9b1e34c3caa227d31868821e42bd0a891708f51ecf', 'admin'),
(3, 'Jeremy Scott', 'jeremy@mail.com', 'scrypt:32768:8:1$wOObmsB0B96XA9SR$8d5ee5af77d8596782a125066a6a9ceb84bb99e90d40d864f91de44325127db499b9294889d6c39abe32db981ebb6b4138de20b85637c9f092f16e085e29d0f8', 'admin'),
(4, 'Jason', 'mail@mail.com', 'scrypt:32768:8:1$PTQH28vjqF3FmKUg$36cf4d4df0eec635188bebbaf15c407e37bdbc48c2150a828f77e17771e82b481a125508848c98dc0c81bb3d3a12554af757a4857bc3e0b8d3907fb095d4e5b1', 'admin'),
(5, 'Employee', 'employee@mail.com', 'scrypt:32768:8:1$TQW1zg7zog7aYcfe$b411d67da871c4a963096ff88dc77af8bee0a76cf2c9ad87f0bedd21c41d177d5644fa8d1bb3351f88619e0bb9b4761ad65296072e86b648b2bf63d20603af76', 'subadmin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`role`(768));

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`role`(768));

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
