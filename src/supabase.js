import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Configuração direta para garantir funcionamento no GitHub Pages
// As chaves "anon" são seguras para uso no frontend em projetos acadêmicos
const supabaseUrl = 'https://mncmrycauwpdtonsnrzj.supabase.co'
const supabaseAnonKey = 'sb_publishable_dq6UBFWpLtAbng7797pIxA_5Yq_Xizx'

// Inicialização do cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)