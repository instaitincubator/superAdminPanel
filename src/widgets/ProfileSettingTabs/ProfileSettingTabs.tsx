import { useTranslation } from '@/shared/hooks/useTranslation'
import { Tabs } from '@/shared/ui/Tabs'
import { useRouter } from 'next/router'

export const ProfileSettingTabs = () => {
    const { t } = useTranslation()
    const optionArray = [
        { label: t.profileTabs.uploadedPhotos, value: 'uploaded-photos' },
        { label: t.profileTabs.payments, value: 'payments' },
        { label: t.profileTabs.followers, value: 'followers' },
        { label: t.profileTabs.followings, value: 'followings' },
    ]

    const router = useRouter()
    const changeMenu = (value: string) => {
        // router.push(`/public-profile/settings/${value}`)
    }

    return (
        <div>
            <Tabs
                defaultValue="general-information"
                onValueChange={changeMenu}
                options={optionArray}
            ></Tabs>
        </div>
    )
}