-- ---------------------------------
-- BASE
-- ---------------------------------
SELECT * FROM links.linksbase;

-- search for name
SELECT * FROM linksbase
WHERE link_name LIKE "%html%";

-- insert new
INSERT INTO linksbase (link_name, link_url)
VALUES ("test", "www,sx,com");

-- delete by id
DELETE FROM linksbase
WHERE link_id = 94
LIMIT 1;

-- update name
UPDATE linksbase
SET link_name = "CSS Reference.io"
WHERE link_id = 93
LIMIT 1;

-- update url
UPDATE linksbase
SET link_url = "https://cssreference.io/"
WHERE link_id = 93
LIMIT 1;

-- ---------------------------------
-- TAGS
-- ---------------------------------
SELECT * FROM links.linkstags;


-- ---------------------------------
-- CONNECTIONS
-- ---------------------------------
SELECT * FROM links.linksconnections;

-- search for links by tags
SELECT linksbase.link_id, link_name, link_url FROM linksbase LEFT JOIN linksconnections ON linksbase.link_id = linksconnections.link_id
WHERE tag_id = ( SELECT tag_id FROM linkstags WHERE tag_name = "editors" );

-- add new connection
INSERT INTO linksconnections (link_id, tag_id)
VALUES ( 
(SELECT link_id FROM linksbase WHERE link_name LIKE "%github%" LIMIT 1),
(SELECT tag_id FROM linkstags WHERE tag_name = "onlinetools" LIMIT 1)
);
