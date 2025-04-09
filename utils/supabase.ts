// supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vrtltqqjjpplxfrqyhco.supabase.co'; // 🔁 from Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydGx0cXFqanBwbHhmcnF5aGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NzA4NDEsImV4cCI6MjA1OTM0Njg0MX0.p7DL3m_LCPKzxekRI7QFHSpzfkIUMnj0ACya6j_R8pU'; // 🔁 from Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
