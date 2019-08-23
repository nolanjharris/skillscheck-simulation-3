INSERT INTO allUsers
(username, password)
VALUES
($1, $2)
returning *;