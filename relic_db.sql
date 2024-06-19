/*
 Navicat Premium Data Transfer

 Source Server         : MySQL-Local
 Source Server Type    : MySQL
 Source Server Version : 80037
 Source Host           : localhost:3306
 Source Schema         : relic_db

 Target Server Type    : MySQL
 Target Server Version : 80037
 File Encoding         : 65001

 Date: 19/06/2024 17:00:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for applications
-- ----------------------------
DROP TABLE IF EXISTS `applications`;
CREATE TABLE `applications`  (
  `application_id` int NOT NULL AUTO_INCREMENT COMMENT '申请唯一标识',
  `artifact_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '申请的文物',
  `applicant_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '申请人姓名',
  `applicant_contact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '申请人联系方式',
  `application_purpose` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '申请目的',
  `application_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '申请日期',
  `application_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '申请状态（例：Pending, Approved, Rejected）',
  PRIMARY KEY (`application_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of applications
-- ----------------------------
INSERT INTO `applications` VALUES (1, '四羊方尊', '李四', '13361941011', '申请文物', '2024-06-19', '已通过');

-- ----------------------------
-- Table structure for artifacts
-- ----------------------------
DROP TABLE IF EXISTS `artifacts`;
CREATE TABLE `artifacts`  (
  `artifact_id` int NOT NULL AUTO_INCREMENT COMMENT '文物唯一标识',
  `artifact_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文物名称',
  `artifact_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '文物描述',
  `artifact_category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文物类别',
  `artifact_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文物所在地',
  `date_discovered` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '发现日期',
  `historical_period` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '历史时期',
  `artifact_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文物状态',
  PRIMARY KEY (`artifact_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of artifacts
-- ----------------------------
INSERT INTO `artifacts` VALUES (3, 'C文物', '这是C文物', '二级保护文物', '河源', '2024-06-18', '未知', '未申请');
INSERT INTO `artifacts` VALUES (4, 'D文物', '这是D文物', '二级保护文物', '湛江', '2024-06-18', '现代', '未申请');
INSERT INTO `artifacts` VALUES (5, 'E文物', '这是E文物', '三级保护文物', '清远', '2024-06-18', '未知', '未申请');
INSERT INTO `artifacts` VALUES (6, 'F文物', '这是F文物', '一级保护文物', '广州', '2024-06-18', '古代', '未申请');
INSERT INTO `artifacts` VALUES (8, 'G文物', '这是G文物', '二级保护文物', '湛江', '2024-06-19', '现代', '未申请');
INSERT INTO `artifacts` VALUES (9, 'A文物', '这是A文物', '二级保护文物', '中山', '2024-06-19', '近代', '未申请');
INSERT INTO `artifacts` VALUES (10, 'B文物', '这是B文物', '二级保护文物', '珠海', '2024-06-19', '古代', '未申请');
INSERT INTO `artifacts` VALUES (11, 'H文物', '这是H文物', '一级保护文物', '韶关', '2024-06-19', '古代', '未申请');
INSERT INTO `artifacts` VALUES (12, 'I文物', '这是I文物', '二级保护文物', '清远', '2024-06-19', '古代', '未申请');
INSERT INTO `artifacts` VALUES (13, 'J文物', '这是J文物', '一级保护文物', '广州', '2024-06-19', '古代', '未申请');
INSERT INTO `artifacts` VALUES (14, 'K文物', '这是K文物', '一级保护文物', '湛江', '2024-06-19', '古代', '未申请');

-- ----------------------------
-- Table structure for reviews
-- ----------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews`  (
  `review_id` int NOT NULL AUTO_INCREMENT COMMENT '审核唯一标识',
  `artifact_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '被审核的文物',
  `application_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '被审核的申请人',
  `reviewer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '审核人的姓名',
  `review_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '审核日期',
  `review_notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '审核备注',
  `review_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '审核状态（例：Approved, Rejected）',
  PRIMARY KEY (`review_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reviews
-- ----------------------------
INSERT INTO `reviews` VALUES (1, '四羊方尊', '李四', '张三', '2024-06-19', '同意申请', '已通过');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `identity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_modified_at` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'test', '$2a$08$hC8aksEoFn5CgXUtWR7VZulvlzhJNedm8MtpCAk/GsGBgBr8O90rG', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
