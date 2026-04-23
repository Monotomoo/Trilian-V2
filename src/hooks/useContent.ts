import { useLocation } from 'react-router-dom'
import { strings, type Lang, type Strings } from '../../content/strings'

export function useLang(): Lang {
  const { pathname } = useLocation()
  return pathname.startsWith('/hr') ? 'hr' : 'en'
}

export function useContent(): Strings {
  const lang = useLang()
  return strings[lang] as Strings
}
