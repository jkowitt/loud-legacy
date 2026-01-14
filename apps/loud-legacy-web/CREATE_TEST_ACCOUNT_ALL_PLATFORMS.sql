-- ============================================
-- CREATE TEST ACCOUNT WITH ACCESS TO ALL PLATFORMS
-- ============================================
-- Email: demo@valora.com
-- Password: demo123
-- ============================================

BEGIN;

-- Step 1: Create or update the user
INSERT INTO "User" (
  id,
  email,
  name,
  password,
  role,
  "emailVerified",
  "createdAt",
  "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'demo@valora.com',
  'Demo Admin',
  '$2a$10$CoNB03ab5x6tieqKeF1pR.uM1NFd2W..qgXoZzGrmhGLvxVe9U4yO',
  'SUPER_ADMIN',
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  "emailVerified" = NOW(),
  "updatedAt" = NOW()
RETURNING id;

-- Step 2: Grant access to ALL platforms
-- Get the user ID
WITH user_info AS (
  SELECT id FROM "User" WHERE email = 'demo@valora.com'
)
INSERT INTO "PlatformAccess" ("id", "userId", "platform", "enabled", "createdAt")
SELECT
  gen_random_uuid(),
  user_info.id,
  platform_name,
  true,
  NOW()
FROM user_info
CROSS JOIN (VALUES ('VALORA'), ('BUSINESS_NOW'), ('LEGACY_CRM'), ('HUB'), ('VENUEVR')) AS platforms(platform_name)
ON CONFLICT ("userId", "platform") DO UPDATE SET
  enabled = true;

COMMIT;

-- ============================================
-- VERIFY INSTALLATION
-- ============================================

-- Check user was created
SELECT
  id,
  email,
  name,
  role,
  "emailVerified" IS NOT NULL as "email_verified"
FROM "User"
WHERE email = 'demo@valora.com';

-- Check platform access
SELECT
  u.email,
  pa.platform,
  pa.enabled
FROM "User" u
JOIN "PlatformAccess" pa ON u.id = pa."userId"
WHERE u.email = 'demo@valora.com'
ORDER BY pa.platform;

-- ============================================
-- EXPECTED RESULTS:
-- ============================================
-- User table: 1 row with role = SUPER_ADMIN
-- PlatformAccess table: 5 rows (one for each platform), all enabled = true
--
-- Login credentials:
-- Email: demo@valora.com
-- Password: demo123
--
-- Platforms accessible:
-- - VALORA (Real Estate Valuation)
-- - BUSINESS_NOW (Business Management)
-- - LEGACY_CRM (CRM & Sales Pipeline)
-- - HUB (Central Dashboard)
-- - VENUEVR (VR Venue Tours)
-- ============================================
