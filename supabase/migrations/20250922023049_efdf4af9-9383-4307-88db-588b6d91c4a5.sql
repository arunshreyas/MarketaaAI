-- Enable Row Level Security on Emails table
ALTER TABLE public."Emails" ENABLE ROW LEVEL SECURITY;

-- Allow public read access to emails (if this is intended for newsletter signups)
-- If you want to restrict access, modify this policy accordingly
CREATE POLICY "Public can insert emails" 
ON public."Emails" 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view emails (adjust as needed)
CREATE POLICY "Authenticated users can view emails" 
ON public."Emails" 
FOR SELECT 
USING (auth.role() = 'authenticated');