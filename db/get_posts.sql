SELECT *, u.username FROM posts p
JOIN allUsers u ON u.id = p.user_id;