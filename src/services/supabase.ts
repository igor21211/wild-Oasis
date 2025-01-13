import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zalulmcrnyzjktpgxqul.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbHVsbWNybnl6amt0cGd4cXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MDI0MzksImV4cCI6MjA1MjI3ODQzOX0.k1q8Oxv6F1IhgMTsGMaej6ccGzeWmkljavJdyp64N1U';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
