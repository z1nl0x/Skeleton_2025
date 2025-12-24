import { supabase } from './supabaseClient';

export async function findActiveKeyword(keyword: string) {
  return supabase
    .from('keywords')
    .select('id, keyword, is_active')
    .eq('keyword', keyword)
    .eq('is_active', true)
    .single();
}

export async function signUpWithKeyword(
  email: string,
  password: string,
  username: string,
  keyword: string
) {

  const { data: kw, error: kwError } = await findActiveKeyword(keyword);
  if (kwError || !kw) {
    return { error: new Error('Palavra-chave inválida ou inativa.') };
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });
  if (signUpError || !signUpData.user) {
    return { error: signUpError ?? new Error('Falha ao registrar usuário.') };
  }

  const userId = signUpData.user.id;

  const { error: profileError } = await supabase
    .from('profiles')
    .insert({ id: userId, username });
  if (profileError) {
    return { error: new Error('Falha ao criar perfil!') };
  }

  const { error: assocError } = await supabase
    .from('user_keywords')
    .insert({ user_id: userId, keyword_id: kw.id });
  if (assocError) {
    return { error: new Error('Falha ao associar a palavra-chave ao usuário.') };
  }

  return { user: signUpData.user };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error };
  return { session: data.session };
}