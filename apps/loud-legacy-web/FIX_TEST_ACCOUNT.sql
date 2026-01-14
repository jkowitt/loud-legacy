-- ============================================
-- STEP 1: CHECK IF USER EXISTS
-- ============================================
-- Run this first to see if the user was created:

SELECT id, email, name, role, "emailVerified", "createdAt"
FROM "User"
WHERE email = 'demo@valora.com';

-- You should see 1 row. If you see 0 rows, the INSERT didn't work.
-- If you see 1 row, proceed to Step 2.


-- ============================================
-- STEP 2: UPDATE/CREATE USER WITH FRESH HASH
-- ============================================
-- This will either create the user or update with a fresh password hash:

DELETE FROM "User" WHERE email = 'demo@valora.com';

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
);

-- Should see: "DELETE 1" then "INSERT 0 1"


-- ============================================
-- STEP 3: VERIFY USER WAS CREATED CORRECTLY
-- ============================================
-- Run this to confirm everything is correct:

SELECT
  id,
  email,
  name,
  password,
  role,
  "emailVerified" IS NOT NULL as "has_emailVerified",
  "createdAt",
  "updatedAt"
FROM "User"
WHERE email = 'demo@valora.com';

-- Check that:
-- ✓ email = 'demo@valora.com'
-- ✓ role = 'SUPER_ADMIN'
-- ✓ password starts with '$2a$10$'
-- ✓ has_emailVerified = true
-- ✓ createdAt and updatedAt have timestamps


-- ============================================
-- CREDENTIALS TO TRY AFTER RUNNING THIS:
-- ============================================
-- Email: demo@valora.com
-- Password: demo123
-- ============================================
