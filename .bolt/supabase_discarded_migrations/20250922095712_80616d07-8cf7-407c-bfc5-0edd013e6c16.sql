-- Secure Emails table: prevent global read access while keeping public inserts working
-- 1) Add user_id column for ownership (nullable to preserve public insert flow)
ALTER TABLE public."Emails"
  ADD COLUMN IF NOT EXISTS user_id uuid;

-- 2) Drop overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view emails" ON public."Emails";

-- 3) Restrictive per-user SELECT policy
CREATE POLICY "Users can view their own emails"
ON public."Emails"
FOR SELECT
USING (auth.uid() = user_id);

-- (Optional) If you later want authenticated inserts to bind ownership automatically,
-- you can set user_id from the client when logged in. Public inserts remain allowed
-- via the existing "Public can insert emails" policy.