ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir update de keywords para registro" 
ON keywords 
FOR UPDATE 
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY "Permitir update de keywords para registro" ON keywords;

CREATE POLICY "Permitir update de keywords para registro" 
ON keywords 
FOR UPDATE 
TO anon, authenticated
USING (is_active = true)    -- Permite encontrar a keyword ativa
WITH CHECK (true);          -- Permite salvar qualquer alteração (incluindo is_active = false)

DROP POLICY "read_active_keywords" ON keywords;

CREATE POLICY "read_active_keywords" 
ON keywords 
FOR SELECT 
TO anon, authenticated 
USING (true); -- Agora ele consegue ver a linha antes e DEPOIS do update