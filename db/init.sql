-- CREATE DATABASE IF NOT EXISTS uv_database
SELECT 'CREATE DATABASE uv_database'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'uv_database')\gexec 