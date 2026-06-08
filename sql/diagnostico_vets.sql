-- ══════════════════════════════════════════════════════════════════
--  ZOONI — Diagnóstico da tabela veterinarios
--  Cole no SQL Editor do Supabase e corre (Run)
-- ══════════════════════════════════════════════════════════════════

-- 1. Ver todas as constraints da tabela veterinarios
SELECT
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name  AS foreign_table,
    ccu.column_name AS foreign_column,
    rc.delete_rule
FROM information_schema.table_constraints AS tc
LEFT JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
LEFT JOIN information_schema.constraint_column_usage AS ccu
    ON tc.constraint_name = ccu.constraint_name
LEFT JOIN information_schema.referential_constraints AS rc
    ON tc.constraint_name = rc.constraint_name
WHERE tc.table_name = 'veterinarios';

-- 2. Contar quantas linhas existem e quantas têm user_id NULL
SELECT
    COUNT(*)                            AS total_vets,
    COUNT(user_id)                      AS vets_com_user_id,
    COUNT(*) - COUNT(user_id)           AS vets_sem_user_id
FROM public.veterinarios;

-- 3. Ver todos os registos (para perceber o estado atual)
SELECT id, nome, email, user_id, status, criado_em
FROM public.veterinarios
ORDER BY criado_em DESC;
