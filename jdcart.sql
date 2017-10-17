/*
 Navicat MySQL Data Transfer

 Source Server         : sky
 Source Server Version : 50712
 Source Host           : localhost
 Source Database       : jdcart

 Target Server Version : 50712
 File Encoding         : utf-8

 Date: 10/09/2017 19:51:28 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `goods`
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pic` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `color` text NOT NULL,
  `num` int(11) NOT NULL,
  `typeid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `goods`
-- ----------------------------
BEGIN;
INSERT INTO `goods` VALUES ('1', '威迅（VENTION）HDMI切换器3进1出 4K高清hdmi分配器三进一出 电脑盒子接电视显示器投影仪带遥控 黑VAA-S17', '//img14.360buyimg.com/n7/jfs/t6379/181/1106044938/162044/34f56dc9/594b5d9dN8924560f.jpg', '58', '切换器三进一出 圆形款|:|切换器三进一出 2K*4K|:|HDMI转HDMI+音频 黑色', '98', '1'), ('2', '网易云音乐车载蓝牙播放器 点烟器式双USB车充 车载充电器 蓝牙FM发射器 智能车充 网易红', '//img14.360buyimg.com/n7/jfs/t967/324/1477265916/65132/2b090c36/5730791eN188f4776.jpg', '119', '炫酷黑|:|网易红', '40', '2'), ('3', '喜马拉雅好声音随车听 车载蓝牙mp3MP3播放器电台FM点播充电器汽车 金属升级版+送数据线', '//img14.360buyimg.com/n7/jfs/t3283/233/963410865/174888/81916989/57c3aee3N1f937fc4.jpg', '168', '金属升级版+送点烟器|:|金属升级版+送数据线', '100', '3'), ('4', '亿色（ESR）车载手机支架 磁性磁吸支架 便携车用粘贴式通用型 适用苹果三星华为小米等 魔力黑', '//img14.360buyimg.com/n7/jfs/t9397/221/1847983732/310146/1788ac0e/59c0870eN38147da8.jpg', '48', '【中控台粘贴款】魔力黑|:|【支架数据线超值2件套】|:|【中控台粘贴款】土豪金', '200', '4'), ('5', '小米（MI）90分旅行箱拉杆箱 男女万向轮登机行李箱 20英寸 星空灰', '//img14.360buyimg.com/n7/jfs/t5809/351/2500040871/172767/d31c9ac7/593135e0N395cddb8.jpg', '299', '极光蓝-20英寸|:|星空灰-20英寸|:|幻夜黑-20英寸|:|月光白-20英寸', '20', '2');
COMMIT;

-- ----------------------------
--  Table structure for `goodsType`
-- ----------------------------
DROP TABLE IF EXISTS `goodsType`;
CREATE TABLE `goodsType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `goodsType`
-- ----------------------------
BEGIN;
INSERT INTO `goodsType` VALUES ('1', '降价商品'), ('2', '促销优惠商品'), ('3', '库存紧张商品'), ('4', '京东超市商品');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
