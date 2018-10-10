//FOR SEEDING A DB TO TEST WITHOUT API CALLS//

CREATE DATABASE bookbag;

USE bookbag;

//tables will be generated with the server starts up the first time//

USE bookbag;

//POPULATE A ROW OF THE USERS TABLE BY SIGNING UP ONLINE//

INSERT INTO Clusters (title, UserId)
VALUE ("CLUSTER 1", 1);
INSERT INTO Clusters (title, UserId)
VALUE ("CLUSTER 2", 1);

INSERT INTO Citations (title, author, url, ClusterId)
VALUES ("Bonnafaccio da Georgio painting analysed",  "Chim Richels", "www.worldcat.org", 1);

INSERT INTO Notes (body, CitationId, ClusterId)
VALUES ("I'm a note about the bonnafacio", 1, 1);

INSERT INTO Notes (body, ClusterId)
VALUES ("Word life homies", 1);

//THIS WILL GET YOU GOING FOR TESTS//

