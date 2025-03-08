import { useRouter } from 'next/router'

// import { english } from '../../../locales/english'
// import { russian } from '../../../locales/russian'

export const useTranslation = () => {
    const router = useRouter()

    const t = router.locale === 'english' ? '' : '' as any
        // english : russian

    return { t }
}
