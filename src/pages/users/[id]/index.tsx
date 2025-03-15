import { getSidebarLayout } from "@/app/layouts/sidebarLayout/sidebarLayout"
import {useGetUserQuery} from "@/queries/user/usergenerated";
import {useTranslation} from "@/shared/hooks/useTranslation";
import Button from "@/shared/ui/Button/Button";
import UserInfo from "@/shared/ui/UserInfo/UserInfo";
import Image from "next/image";
import {useRouter} from "next/router";

import {ArrowBack, noImage} from "../../../../public";
import {ProfileSettingTabs} from "@/widgets/ProfileSettingTabs/ProfileSettingTabs";

export default function User() {
    const router = useRouter()
    const {data} = useGetUserQuery({variables: {
            userId: Number(router.query.id)
        }})
    const {t, locale} = useTranslation()
    const createdon = new Date(data?.getUser.createdAt)
    const formatDate = createdon.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })

    const backButtonHandler = () => {
        router.back()
    }

    return <div className='p-6'>
        <Button className="flex items-center gap-[12px] text-medium-14 mb-6 hover:text-accent-100 px-0" variant="text" onClick={backButtonHandler}><ArrowBack />{t.admin.user.backLink}</Button>
        {data && <div className="mb-7">
            <div className="flex gap-6 mb-5">
                {data.getUser.profile.avatars?.length
                    ? <Image alt={`${data.getUser.profile.firstName} ${data.getUser.profile.lastName}`} src={data.getUser.profile.avatars[0].url as string} className="rounded-[50%] object-cover" width={60} height={60}  />
                    : <Image alt={`${data.getUser.profile.firstName} ${data.getUser.profile.lastName}`} src={noImage} className="rounded-[50%] object-cover" width={60} height={60}  />
                }
                <div>
                    <h1 className="text-h1">{`${data.getUser.profile.firstName} ${data.getUser.profile.lastName}`}</h1>
	                <a className="underline text-regular-14 hover:text-accent-100" href={`mailto:${data.getUser.email}`}>{data.getUser.email}</a>
                </div>
            </div>
            <div className="flex gap-3">
                <UserInfo info={data.getUser.profile.id.toString()} title={t.admin.user.userId} />
                <UserInfo info={formatDate} title={t.admin.user.createdAt} />
            </div>
        </div>}
        <div className="pb-6 overflow-x-auto scroll-hidden pt-6 md:pt-9">
            <ProfileSettingTabs />
        </div>
    </div>
}

User.getLayout = getSidebarLayout