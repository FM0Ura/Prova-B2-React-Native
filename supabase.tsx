import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "<SUA URL SUPABASE>"; // URL do Supabase
const SUPABASE_ANON_KEY = "<SUA CHAVE ANONIMA SUPABASE>"; // Chave Anônima do Supabase

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
