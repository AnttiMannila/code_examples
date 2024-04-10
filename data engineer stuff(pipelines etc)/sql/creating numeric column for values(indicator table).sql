ALTER TABLE public.indicators
ADD COLUMN value_numeric NUMERIC;

UPDATE public.indicators
SET value_numeric = CAST(value AS NUMERIC);