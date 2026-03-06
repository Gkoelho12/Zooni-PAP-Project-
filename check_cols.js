const { createClient } = require('@supabase/supabase-js');
const sb = createClient('https://xqtbtggmwejnkhckduti.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxdGJ0Z2dtd2VqbmtoY2tkdXRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzY5NTk2MSwiZXhwIjoyMDgzMjcxOTYxfQ._cZwHqalRfh9ZDavB_z7M6q8ZhgRmtYRceeW_6SRjGM');
sb.from('tickets').select('*').limit(1).then(({ data }) => console.log(Object.keys(data[0] || {}).join(', ')));
