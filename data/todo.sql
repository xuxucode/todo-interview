CREATE TABLE `todo`.`todo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `is_complete` INT(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- 插入初始测试数据
INSERT INTO `todo`.`todo` (`id`, `title`, `is_complete`) VALUES ('1', 'Read book', '0');
INSERT INTO `todo`.`todo` (`id`, `title`, `is_complete`) VALUES ('2', 'Do homework', '0');
INSERT INTO `todo`.`todo` (`id`, `title`, `is_complete`) VALUES ('3', 'Take a cup of coffee', '0');
