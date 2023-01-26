CREATE TABLE `tech_blog_db`.`blogpost` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `authorId` BIGINT NOT NULL,
  `parentId` BIGINT NULL DEFAULT NULL,
  `title` VARCHAR(75) NOT NULL,
  `metaTitle` VARCHAR(100) NULL,
  `slug` VARCHAR(100) NOT NULL,
  `summary` TINYTEXT NULL,
  `published` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `publishedAt` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_slug` (`slug` ASC),
  INDEX `idx_post_user` (`authorId` ASC),
  CONSTRAINT `fk_post_user`
    FOREIGN KEY (`authorId`)
    REFERENCES `tech_blog_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `tech_blog_db`.`blogpost` 
ADD INDEX `idx_post_parent` (`parentId` ASC);
ALTER TABLE `tech_blog_db`.`blogpost` 
ADD CONSTRAINT `fk_post_parent`
  FOREIGN KEY (`parentId`)
  REFERENCES `tech_blog_db`.`blogpost` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;