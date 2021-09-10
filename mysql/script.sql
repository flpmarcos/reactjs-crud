create database ReactCrudDatabase;

CREATE TABLE `movie_review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movieName` varchar(200) NULL,
  `movieReview` text NULL
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;