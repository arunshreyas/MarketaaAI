-- Add campaign_id to Conversations table
ALTER TABLE "Conversations" 
ADD COLUMN campaign_id bigint REFERENCES "Campaigns"(id) ON DELETE CASCADE;

-- Create index for better query performance
CREATE INDEX idx_conversations_campaign_id ON "Conversations"(campaign_id);

-- Update RLS policies for Conversations to check campaign ownership
DROP POLICY IF EXISTS "Users can insert their own conversations" ON "Conversations";
DROP POLICY IF EXISTS "Users can view their own conversations" ON "Conversations";
DROP POLICY IF EXISTS "Users can update their own conversations" ON "Conversations";
DROP POLICY IF EXISTS "Users can delete their own conversations" ON "Conversations";

CREATE POLICY "Users can insert conversations for their campaigns" 
ON "Conversations" 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM "Campaigns" 
    WHERE id = campaign_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can view conversations for their campaigns" 
ON "Conversations" 
FOR SELECT 
USING (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM "Campaigns" 
    WHERE id = campaign_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update conversations for their campaigns" 
ON "Conversations" 
FOR UPDATE 
USING (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM "Campaigns" 
    WHERE id = campaign_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete conversations for their campaigns" 
ON "Conversations" 
FOR DELETE 
USING (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM "Campaigns" 
    WHERE id = campaign_id AND user_id = auth.uid()
  )
);