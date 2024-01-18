import { createClient } from "@supabase/supabase-js";
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwbGllYm91ZXJyeWhrb2Zod3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1NDQ3NzgsImV4cCI6MjAyMTEyMDc3OH0.WD3YHNfTF3Dtes93Z5RukYTMqA-FPFnef_hCt_WC7Qw';
const supaURL = 'https://lpliebouerryhkofhwrs.supabase.co';
export const supabase = createClient(supaURL, apiKey);
