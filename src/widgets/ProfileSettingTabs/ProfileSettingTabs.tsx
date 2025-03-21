import { UserTabs } from '@/features/UserTabs/UserTabs'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Tabs } from '@/shared/ui/Tabs'
import { useRouter } from 'next/router'

type Props = {
    route:string
    userId: number
}

export const ProfileSettingTabs = ({route, userId} : Props) => {
    const { t } = useTranslation()
    const optionArray = [
        { label: t.profileTabs.uploadedPhotos, value: 'uploaded-photos' },
        { label: t.profileTabs.payments, value: 'payments' },
        { label: t.profileTabs.followers, value: 'followers' },
        { label: t.profileTabs.followings, value: 'followings' },
    ]

    const router = useRouter()
    const changeMenu = (value: string) => {
        router.replace(`/users/${userId}?tab=${value}`)
    }

    return (
        <div>
            <Tabs
                defaultValue={route}
                onValueChange={changeMenu}
                options={optionArray}
            ></Tabs>
            <UserTabs query={route} userId={userId} />
        </div>
    )
}