import Image from "next/image"
import { Avatar } from "@/types"

interface Props {
  postOwnerAvatars?: Avatar[]
  postOwnerUsername: string
}

export const UserAvatarForPosts = ({
  postOwnerAvatars,
  postOwnerUsername,
}: Props) => {
  return postOwnerAvatars &&
    postOwnerAvatars.length > 1 &&
    postOwnerAvatars[1].url ? (
    <Image
      src={postOwnerAvatars[1].url}
      alt={`${postOwnerUsername}'s avatar`}
      width={postOwnerAvatars[1].width!}
      height={postOwnerAvatars[1].height!}
      className="rounded-full"
    />
  ) : (
    <Image
      src={"/avatar.png"}
      alt={`${postOwnerUsername}'s avatar`}
      width={36}
      height={36}
      className="rounded-full"
    />
  )
}
