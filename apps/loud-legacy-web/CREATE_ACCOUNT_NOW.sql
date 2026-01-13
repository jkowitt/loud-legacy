-- ============================================
-- COPY AND PASTE THIS INTO NEON SQL EDITOR
-- ============================================
-- This creates the demo@valora.com test account
-- Password: demo123
-- ============================================

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
  '$2a$10$BsUmWxMW4feuOFvHUuzjueMhJaoi38Z4emUPOjsFbdadxtEgI0J.a',
  'SUPER_ADMIN',
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (email)
DO UPDATE SET
  password = EXCLUDED.password,
  role = EXCLUDED.role,
  "emailVerified" = NOW(),
  "updatedAt" = NOW();

-- After running this, you can login with:
-- Email: demo@valora.com
-- Password: demo123
