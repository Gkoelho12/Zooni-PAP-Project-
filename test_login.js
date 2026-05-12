const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://xqtbtggmwejnkhckduti.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxdGJ0Z2dtd2VqbmtoY2tkdXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2OTU5NjEsImV4cCI6MjA4MzI3MTk2MX0.G1wG0UC6sF7r6tMxGdqLGvsHa_dxlVD1-j6QNEw32IM';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testLogin() {
    console.log("Testing connection...");
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: 'gostodebatatasfritaspqsim@zooni.com',
        password: 'gui123'
    });

    if (error) {
        console.error("Login failed:", error.message, error.status);
    } else {
        console.log("Login successful!", data.user.id);
        
        console.log("Checking clientes table...");
        const { data: cliente, error: cliError } = await supabaseClient
            .from('clientes')
            .select('*')
            .eq('user_id', data.user.id)
            .single();
            
        if (cliError) {
             console.error("Failed to fetch from clientes:", cliError);
        } else {
             console.log("Found cliente:", cliente);
        }
    }
}

testLogin();
