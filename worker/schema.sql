# GEO Encyclopedia AI Crawler Log — D1 Schema

CREATE TABLE IF NOT EXISTS crawler_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  date TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d', 'now')),
  ua TEXT,
  crawler_name TEXT,
  path TEXT NOT NULL,
  status INTEGER,
  is_html INTEGER DEFAULT 0,
  referer_host TEXT
);

CREATE INDEX IF NOT EXISTS idx_logs_date ON crawler_logs(date);
CREATE INDEX IF NOT EXISTS idx_logs_crawler ON crawler_logs(crawler_name);
CREATE INDEX IF NOT EXISTS idx_logs_path ON crawler_logs(path);

# GEO Encyclopedia Community Comments — D1 Schema
# Moderation queue: status = pending | approved | deleted. Writes are rate-limited per IP.

CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page TEXT NOT NULL,
  author TEXT NOT NULL,
  email TEXT,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  ts TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  ip TEXT
);

CREATE INDEX IF NOT EXISTS idx_comments_page ON comments(page);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);
