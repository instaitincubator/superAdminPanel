import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@/shared/motion-primitives/disclosure"
import { transition } from "@/features/posts-list/CONSTs"
import { formatDate } from "@/shared/utils/formatDate"
import { useTranslation } from "@/shared/hooks/useTranslation"
import { Avatar } from "@/types"
import { UserAvatarForPosts } from "@/features/posts-list/ui/UserAvatarForPosts"
import Link from "next/link"

interface Props {
  updatedAt: string
  description: string
  postOwnerUsername: string
  postOwnerAvatars?: Avatar[]
  postOwnerId?: number
}

export const PostDescription = ({
  postOwnerUsername,
  description,
  updatedAt,
  postOwnerId,
  postOwnerAvatars,
}: Props) => {
  const { t } = useTranslation()
  return (
    <Disclosure
      className="absolute bottom-0 left-0 right-0 z-10"
      transition={transition}
    >
      <DisclosureTrigger>
        <div className="flex flex-col px-4 py-2 justify-center gap-2 bg-dark-700">
          <Link
            href={{
              pathname: `/users/${postOwnerId}`,
            }}
            className="text-regular-14 flex items-center gap-4"
          >
            <UserAvatarForPosts
              postOwnerAvatars={postOwnerAvatars}
              postOwnerUsername={postOwnerUsername}
            />
            <span className="text-regular-14">{postOwnerUsername}</span>
          </Link>
          <div className="text-medium-14 text-light-900 flex justify-between">
            <div>{formatDate(updatedAt)}</div>
            {description.length > 0 && (
              <div className="opacity-50">
                {t.admin.userList.postsList.openDescription}
              </div>
            )}
          </div>
        </div>
      </DisclosureTrigger>
      <DisclosureContent>
        {description.length > 0 && (
          <div className="flex flex-col pb-4 text-[13px] bg-dark-700 ">
            {description}
          </div>
        )}
      </DisclosureContent>
    </Disclosure>
  )
}
