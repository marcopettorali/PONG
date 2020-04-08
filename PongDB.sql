SET NAMES latin1;

BEGIN;
CREATE DATABASE IF NOT EXISTS PongDB;
COMMIT;

USE PongDB;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
Username VARCHAR(255) NOT NULL,
Password VARCHAR(255) NOT NULL,
Name VARCHAR(255) NOT NULL,
Surname VARCHAR(255) NOT NULL,
Email VARCHAR(255),
Admin INTEGER NOT NULL,

Theme VARCHAR(255) NOT NULL,

MatchPlayed INTEGER NOT NULL,
MatchVsCpu INTEGER NOT NULL,
MatchVsHuman INTEGER NOT NULL,
VictoriesVsCpu INTEGER NOT NULL,
VictoriesVsHuman INTEGER NOT NULL,
PlayTime INTEGER NOT NULL,
BonusTaken INTEGER NOT NULL,
Points INTEGER NOT NULL,

PRIMARY KEY (Username)
)ENGINE=INNODB DEFAULT CHARSET=LATIN1;

INSERT INTO Users VALUES ("pippo", "pippo", "Pippo", "Pipponi", "" , 0, "classic", 0, 0, 0, 0, 0, 0, 0, 0),
						 ("Marco", "Pettorali", "Marco", "Pettorali", "marcopettorali1@gmail.com",1,"classic", 0, 0, 0, 0, 0, 0, 0, 0),
                         ("kekko01", "pippo", "Francesco", "Bianchi", "" ,0,"classic",  0, 0, 0, 0, 0, 0, 0, 13),
                         ("matte03", "pippo", "Matteo", "Fabbri", "" ,0,"classic",  0, 0, 0, 0, 0, 0, 0, 11),
                         ("AleLive", "pippo", "Alessandro", "Liverani", "" ,0,"classic",  0, 0, 0, 0, 0, 0, 0, 22),
                         ("noah", "pippo", "Noemi", "Bernardini", "" ,0,"classic",  0, 0, 0, 0, 0, 0, 0, 34),
                         ("wannabelieve", "pippo", "Lorena", "Fischioni", "" ,0,"classic",  0, 0, 0, 0, 0, 0, 0, 26),
                         ("IlTalismano", "pippo", "Simone", "Padoin", "" ,0,"classic",  0, 0, 0, 0, 0, 0, 0, 16),
                         ("Barto", "pippo", "Andrea", "Bartolini", "" ,0,"classic",  0, 0, 0, 0, 0, 0, 0, 14),
                         ("Elta", "pippo", "Elia", "Trota", "" ,0,"classic",  0, 0, 0, 0, 0, 0, 0, 28),
                         ("flowerGirlXX99", "pippo", "Margherita", "Del Campo", "" ,0,"classic",  0, 0, 0, 0, 0, 0, 0, 25),
                         ("forzaalbinoleffe98", "pippo", "Ginevra", "Cappelletti", "" ,0,"classic",  0, 0, 0, 0, 0, 0, 0, 1),
                         ("leomessi87", "messi", "Lionel", "Messi", "" ,0,"messi",  0, 0, 0, 0, 0, 0, 0, 0);