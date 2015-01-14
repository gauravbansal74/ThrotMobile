-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2014 at 10:01 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `buzzx7nt_throt`
--

-- --------------------------------------------------------

--
-- Table structure for table `markers`
--

CREATE TABLE IF NOT EXISTS `markers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET latin1 NOT NULL,
  `address` varchar(80) CHARACTER SET latin1 NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL,
  `isActive` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=30 ;

--
-- Dumping data for table `markers`
--

INSERT INTO `markers` (`id`, `name`, `address`, `lat`, `lng`, `isActive`) VALUES
(1, 'Ci Gusta', '283/A, Mantris Building, Near Omega Hospital Road Number 92, Banjara Hills Hyder', 17.414181, 78.423378, 1),
(2, 'Kargeens Cafe', 'Kasu Brahmananda Reddy National Park Jubilee Hills Check Post Rd, MLA Colony, Ba', 17.414358, 78.422089, 1),
(3, 'Mist n Creams', 'Omega Hospital Road 13-A-B-C, MLA Colony Road Number 12, MLA Colony, Banjara Hil', 17.411602, 78.423630, 1),
(4, 'My Cafe Latte : Karkhana', 'Rainbow shopping mall R.R Rd, Karkhana Secunderabad, Seemandhra 500009', 17.464954, 78.503288, 1),
(5, 'Xtreme Sports Bar : SVM', 'SVM@3rd flr Road Number 36, CBI Colony, Jubilee Hills Hyderabad, Seemandhra 5000', 17.431635, 78.406578, 1),
(6, 'Park Hyatt Hyderabad', 'Road Number 2,Banjara Hills Hyderabad, Telangana 500034', 17.424780, 78.429604, 1),
(25, 'Farmers Folly Guest house', '40 Farmer''s Folly Street, Pretoria, 0081, South Africa', -25.754808, 28.252571, 1),
(8, 'Colossus 360', '8-2-293/82/L/271/A, Road Number 86, MLA Colony, Banjara Hills, Hyderabad, Telang', 17.413355, 78.423538, 1),
(27, 'FPD West Block', '173 Mary Road, Pretoria, 0184, South Africa', -25.765739, 28.307589, 1),
(14, 'zxcvbbb', '275/A/B, MLA Colony, Banjara Hills, Hyderabad, Telangana 500096, India', 17.413309, 78.423546, 1),
(29, 'Colossus 360 New Office', '1142, Road No 12, MLA Colony, Banjara Hills, Hyderabad, Telangana 500034, India', 17.410511, 78.423225, 1),
(26, 'FPD', '173 Mary Road, Pretoria, 0184, South Africa', -25.765736, 28.307583, 1),
(20, 'BOS India', 'Ayyappa Society Park Road, Sri Sai Nagar, Madhapur, Hyderabad, Telangana 500081,', 17.446383, 78.393501, 1),
(28, 'Town Lodge Hotel', '119 Grayston Drive, Sandton, 2031, South Africa', -26.098593, 28.062822, 1),
(23, 'Mxit India', '714, Venkateswara Colony, Venkateswara Colony, Banjara Hills, Hyderabad, Telanga', 17.409945, 78.425385, 1);

-- --------------------------------------------------------

--
-- Table structure for table `outletoffers`
--

CREATE TABLE IF NOT EXISTS `outletoffers` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `outletid` int(11) NOT NULL,
  `offername` varchar(35) NOT NULL,
  `offerdescription` text NOT NULL,
  `offerpicture` varchar(120) NOT NULL,
  `offerlimit` int(5) NOT NULL,
  `offernotes` text NOT NULL,
  `dateCreated` date NOT NULL,
  `timeCreated` time NOT NULL,
  `timeEnded` time NOT NULL,
  `datedEnded` date NOT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `outletoffers`
--

INSERT INTO `outletoffers` (`id`, `outletid`, `offername`, `offerdescription`, `offerpicture`, `offerlimit`, `offernotes`, `dateCreated`, `timeCreated`, `timeEnded`, `datedEnded`, `Timestamp`, `isActive`) VALUES
(1, 3, '1+1 on all Beverages', 'Get 1+1 on all beverages(non-alcholic) at our outlet in Banjara Hills', '', 20, 'Offer Valid till 31st August', '2014-08-27', '00:00:00', '00:00:00', '0000-00-00', '0000-00-00 00:00:00', 0),
(2, 3, '1+1 on all Beverages', 'Get 1+1 on all beverages(non-alcholic) at our outlet in Banjara Hills', '', 20, 'Offer Valid till 31st August', '2014-08-27', '00:00:00', '00:00:00', '0000-00-00', '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `transactiondata`
--

CREATE TABLE IF NOT EXISTS `transactiondata` (
  `id` int(99) NOT NULL AUTO_INCREMENT,
  `outletid` int(99) NOT NULL,
  `offerid` int(99) NOT NULL,
  `customerid` int(99) NOT NULL,
  `transaction_code` varchar(50) NOT NULL,
  `datecreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `userdb`
--

CREATE TABLE IF NOT EXISTS `userdb` (
  `id` int(99) NOT NULL AUTO_INCREMENT,
  `phoneNumber` int(10) NOT NULL,
  `country_code` int(3) NOT NULL,
  `status` int(1) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
