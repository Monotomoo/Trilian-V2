import { useParams } from 'react-router-dom'
import { strings, type Lang, type Strings } from '../../content/strings'

export function useLang(): Lang {
  const { lang } = useParams<{ lang?: string }>()
  return lang === 'hr' ? 'hr' : 'en'
}

export function useContent(): Strings {
  const lang = useLang()
  return strings[lang]
}
