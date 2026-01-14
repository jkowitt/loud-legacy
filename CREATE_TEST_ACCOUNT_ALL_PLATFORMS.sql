-- Create test account with access to all LOUD Legacy platforms
-- Run this in your Neon database console

-- Create the demo user account (password: demo123)
INSERT INTO "User" (id, email, name, password, role, "emailVerified", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'demo@valora.com',
  'Demo Admin',
  '$2a$10$CoNB03ab5x6tieqKeF1pR.uM1NFd2W..qgXoZzGrmhGLvxVe9U4yO',  -- bcrypt hash of 'demo123'
  'SUPER_ADMIN',
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  "updatedAt" = NOW();

-- Grant access to all platforms
WITH user_info AS (
  SELECT id FROM "User" WHERE email = 'demo@valora.com'
)
INSERT INTO "PlatformAccess" ("id", "userId", "platform", "enabled", "createdAt")
SELECT
  gen_random_uuid(),
  user_info.id,
  platform_name::text,
  true,
  NOW()
FROM user_info
CROSS JOIN (
  VALUES
    ('VALORA'),
    ('BUSINESS_NOW'),
    ('LEGACY_CRM'),
    ('HUB'),
    ('VENUEVR')
) AS platforms(platform_name)
ON CONFLICT ("userId", "platform") DO UPDATE SET
  enabled = true;

-- Verify the account was created
SELECT
  u.email,
  u.name,
  u.role,
  COUNT(pa.id) as platform_count,
  STRING_AGG(pa.platform::text, ', ') as platforms
FROM "User" u
LEFT JOIN "PlatformAccess" pa ON u.id = pa."userId" AND pa.enabled = true
WHERE u.email = 'demo@valora.com'
GROUP BY u.id, u.email, u.name, u.role;
