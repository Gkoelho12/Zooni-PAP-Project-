// Import the Supabase client
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const SUPABASE_URL = 'https://xqtbtggmwejnkhckduti.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxdGJ0Z2dtd2VqbmtoY2tkdXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2OTU5NjEsImV4cCI6MjA4MzI3MTk2MX0.G1wG0UC6sF7r6tMxGdqLGvsHa_dxlVD1-j6QNEw32IM';

// Create a Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Test the connection
(async () => {
    const { data, error } = await supabase.from('clientes').select('*').limit(1);

    if (error) {
        console.error('Erro ao conectar ao Supabase:', error);
    } else {
        console.log('Conexão bem-sucedida! Dados de teste:', data);
    }
})();