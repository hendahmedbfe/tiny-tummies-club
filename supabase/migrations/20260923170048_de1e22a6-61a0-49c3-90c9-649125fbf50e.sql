CREATE TABLE public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT subscribers_email_length CHECK (char_length(email) BETWEEN 3 AND 254),
  CONSTRAINT subscribers_email_lowercase CHECK (email = lower(email)),
  CONSTRAINT subscribers_email_unique UNIQUE (email)
);

GRANT INSERT ON public.subscribers TO anon;
GRANT INSERT ON public.subscribers TO authenticated;
GRANT ALL ON public.subscribers TO service_role;

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
ON public.subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email = lower(btrim(email))
  AND char_length(email) BETWEEN 3 AND 254
  AND email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
);