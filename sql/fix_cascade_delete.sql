-- ══════════════════════════════════════════════════════════════════
--  ZOONI — Fix cascade deletes
--  Cole este script no Supabase SQL Editor e execute (Run / F5)
-- ══════════════════════════════════════════════════════════════════

-- 1. clientes → auth.users
--    Quando um utilizador é apagado no Auth, apaga o perfil em clientes
-- ─────────────────────────────────────────────────────────────────────
ALTER TABLE public.clientes
    DROP CONSTRAINT IF EXISTS clientes_user_id_fkey;

ALTER TABLE public.clientes
    ADD CONSTRAINT clientes_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- 2. animais → clientes
--    Quando um cliente é apagado, apaga os seus animais
-- ─────────────────────────────────────────────────────────────────────
ALTER TABLE public.animais
    DROP CONSTRAINT IF EXISTS animais_id_dono_fkey;

ALTER TABLE public.animais
    ADD CONSTRAINT animais_id_dono_fkey
    FOREIGN KEY (id_dono)
    REFERENCES public.clientes(id)
    ON DELETE CASCADE;

-- 3. tickets → clientes
--    Quando um cliente é apagado, apaga os seus tickets
-- ─────────────────────────────────────────────────────────────────────
ALTER TABLE public.tickets
    DROP CONSTRAINT IF EXISTS tickets_id_dono_fkey;

ALTER TABLE public.tickets
    ADD CONSTRAINT tickets_id_dono_fkey
    FOREIGN KEY (id_dono)
    REFERENCES public.clientes(id)
    ON DELETE CASCADE;

-- ══════════════════════════════════════════════════════════════════
--  Verificação — deve retornar as 3 constraints criadas
-- ══════════════════════════════════════════════════════════════════
SELECT
    tc.table_name,
    kcu.column_name,
    rc.delete_rule
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.referential_constraints AS rc
    ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name IN ('clientes', 'animais', 'tickets')
ORDER BY tc.table_name;
