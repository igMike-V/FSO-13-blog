/* Create a new table for blogs */
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

/* Add two entries to blogs table */

INSERT INTO blogs (author, url, title) values ('Dan Abramov', 'https://overreacted.io/', 'Ocerreacted - A blog by Dan Abramov');
INSERT INTO blogs (author, url, title) values ('Laurenz Albe', 'https://www.cybertec-postgresql.com/en/gaps-in-sequences-postgresql/', 'Gaps in sequences in PostgreSQL');