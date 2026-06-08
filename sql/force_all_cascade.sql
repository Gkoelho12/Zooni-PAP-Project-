-- ══════════════════════════════════════════════════════════════════
-- ZOONI — Forçar o Cascade Delete em TODAS as tabelas
-- Copie este código e execute no SQL Editor do Supabase
-- ══════════════════════════════════════════════════════════════════

DO $$
DECLARE
    r RECORD;
BEGIN
    -- Percorre todas as foreign keys que referenciam auth.users
    FOR r IN (
        SELECT tc.table_name, tc.constraint_name, kcu.column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
        WHERE constraint_type = 'FOREIGN KEY' AND ccu.table_name = 'users' AND ccu.table_schema = 'auth'
    ) LOOP
        -- Apaga a FK antiga e recria com ON DELETE CASCADE
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.table_name) || ' DROP CONSTRAINT ' || quote_ident(r.constraint_name);
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.table_name) || ' ADD CONSTRAINT ' || quote_ident(r.constraint_name) ||
                ' FOREIGN KEY (' || quote_ident(r.column_name) || ') REFERENCES auth.users(id) ON DELETE CASCADE';
    END LOOP;

    -- Percorre todas as foreign keys que referenciam clientes
    FOR r IN (
        SELECT tc.table_name, tc.constraint_name, kcu.column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
        WHERE constraint_type = 'FOREIGN KEY' AND ccu.table_name = 'clientes' AND ccu.table_schema = 'public'
    ) LOOP
        -- Apaga a FK antiga e recria com ON DELETE CASCADE
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.table_name) || ' DROP CONSTRAINT ' || quote_ident(r.constraint_name);
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.table_name) || ' ADD CONSTRAINT ' || quote_ident(r.constraint_name) ||
                ' FOREIGN KEY (' || quote_ident(r.column_name) || ') REFERENCES public.clientes(id) ON DELETE CASCADE';
    END LOOP;

    -- Percorre todas as foreign keys que referenciam veterinarios
    FOR r IN (
        SELECT tc.table_name, tc.constraint_name, kcu.column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
        WHERE constraint_type = 'FOREIGN KEY' AND ccu.table_name = 'veterinarios' AND ccu.table_schema = 'public'
    ) LOOP
        -- Apaga a FK antiga e recria com ON DELETE CASCADE
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.table_name) || ' DROP CONSTRAINT ' || quote_ident(r.constraint_name);
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.table_name) || ' ADD CONSTRAINT ' || quote_ident(r.constraint_name) ||
                ' FOREIGN KEY (' || quote_ident(r.column_name) || ') REFERENCES public.veterinarios(user_id) ON DELETE CASCADE';
    END LOOP;
END $$;
