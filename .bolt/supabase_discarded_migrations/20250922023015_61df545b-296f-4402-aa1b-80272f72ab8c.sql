-- Enable Row Level Security on Conversations table
ALTER TABLE public."Conversations" ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own conversations
CREATE POLICY "Users can view their own conversations" 
ON public."Conversations" 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to insert their own conversations
CREATE POLICY "Users can insert their own conversations" 
ON public."Conversations" 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own conversations
CREATE POLICY "Users can update their own conversations" 
ON public."Conversations" 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Allow users to delete their own conversations
CREATE POLICY "Users can delete their own conversations" 
ON public."Conversations" 
FOR DELETE 
USING (auth.uid() = user_id);