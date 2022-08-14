import { supabase } from '../libs/supabaseClient'

export const fetchUser = () => {
  if (!supabase) return
  const authResponse = supabase.auth.session()
  return authResponse?.user
}
