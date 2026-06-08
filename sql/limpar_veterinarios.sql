-- ══════════════════════════════════════════════════════════════════
--  ZOONI — Limpeza da Tabela Veterinários e Correção de Auth
--  Cole este script no Supabase SQL Editor e execute (Run)
-- ══════════════════════════════════════════════════════════════════

-- 1. APAGAR AS COLUNAS NÃO USADAS
-- ─────────────────────────────────────────────────────────────────────
ALTER TABLE public.veterinarios
    DROP COLUMN IF EXISTS numero_cedula,
    DROP COLUMN IF EXISTS nome_clinica,
    DROP COLUMN IF EXISTS licenca,
    DROP COLUMN IF EXISTS anos_experiencia;

-- 2. CORRIGIR O ERRO DE APAGAR NO AUTH PARA VETERINÁRIOS
-- (Isto resolve o erro "Database error deleting user" ao apagar vets)
-- ─────────────────────────────────────────────────────────────────────
ALTER TABLE public.veterinarios
    DROP CONSTRAINT IF EXISTS veterinarios_user_id_fkey;

ALTER TABLE public.veterinarios
    ADD CONSTRAINT veterinarios_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- 3. LIMPEZA DE VETERINÁRIOS ÓRFÃOS (Opcional mas recomendado)
-- (Apaga os registos na tabela veterinários que ficaram com user_id = NULL)
-- ─────────────────────────────────────────────────────────────────────
DELETE FROM public.veterinarios WHERE user_id IS NULL;
