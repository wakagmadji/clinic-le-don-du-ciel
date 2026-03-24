import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useRdvCount() {
  const [count, setCount] = useState(0)

  const load = async () => {
    const { count: c } = await supabase
      .from('rendez_vous')
      .select('*', { count: 'exact', head: true })
      .eq('statut', 'en_attente')
    setCount(c ?? 0)
  }

  useEffect(() => {
    load()
    const channel = supabase
      .channel('rdv-count')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rendez_vous' }, load)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  return count
}
