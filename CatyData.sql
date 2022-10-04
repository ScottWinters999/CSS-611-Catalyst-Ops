-- Active: 1664318840278@@localhost@3306@chatbot
CREATE DATABASE caty;

SHOW DATABASES;

USE caty;

CREATE TABLE UserInfo(
    UserID INT,
    UserName VARCHAR(20),
    UserPassword VARCHAR(20),
    Email VARCHAR(20),
    Position VARCHAR(20),
    Photo BLOB,
    Industry VARCHAR(20),
    UserLocation VARCHAR(20),
    UserFunction VARCHAR(20),
    PremiumUser BOOLEAN,
    CreatedAt DATE,
    ModifiedAt DATE
);

CREATE TABLE UserViewed(
    UserID INT,
    Viewed_Profile_user_ID INT,
    Date_of_view DATE
);

CREATE TABLE Goal(
    GoalID INT,
    GoalName VARCHAR(20),
    UserID INT,
    Goal_Status VARCHAR(20),
    CreatedAt DATE
);

CREATE TABLE ActiveUserSearch (
    UserID INT,
    CreatedAt DATE,
    Searching_for VARCHAR(20),
    flag_search_achieved_or_not BOOLEAN
);

CREATE TABLE ConversationHistory  (
    UserID INT,
    Conversation_JSON JSON
);

CREATE TABLE Skillset(
    SkillsetID INT,
    Skillset VARCHAR(20),
    UserID INT,
    Experience VARCHAR(20),
    Expertise VARCHAR(20)
);

CREATE TABLE AdminUser(
    AdminID INT,
    AdminEmail VARCHAR(20),
    AdminPassword VARCHAR(20),
    AdminName VARCHAR(20),
    TotalUserCount INT,
    TotalPremiumUserCount INT,
    TotalRevenue INT,
    CreatedAt DATE
);

CREATE TABLE SkillsetSearch(
    SearchID INT,
    SkillsetSeeking VARCHAR(20),
    UserID INT,
    ExpertiseRequired VARCHAR(20),
    Date_of_search DATE
);

SHOW TABLES;