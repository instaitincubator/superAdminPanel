import React, { useState } from "react"

import { useBanUserMutation } from "@/queries/banUser/banUsergenerated"
import { useRemoveUserMutation } from "@/queries/removeUser/removeUsergenerated"
import { AlignCenterIcon } from "@/shared/animate-svg/align-center"
import { BanIcon } from "@/shared/animate-svg/ban"
import { CheckIcon } from "@/shared/animate-svg/check"
import { DeleteIcon } from "@/shared/animate-svg/delete"
import { XIcon } from "@/shared/animate-svg/x"
import { useTranslation } from "@/shared/hooks/useTranslation"
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "@/shared/motion-primitives/morphing-popover"
import { cn } from "@/shared/utils/cn"
import { useApolloClient } from "@apollo/client"
import {useRouter} from "next/router";

interface Props {
  index: number
  usersLength: number
  userId: number
}

export const ActionWithUserMenu = ({ usersLength, index, userId }: Props) => {
  const client = useApolloClient()
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const router = useRouter()

  const [removeUserMutation] = useRemoveUserMutation()
  const [banUserMutation] = useBanUserMutation()
  const banUserHandler = () => {
    void banUserMutation({
      variables: {
        userId: userId,
        banReason: "reason",
      },
      onCompleted: () => {
        client.refetchQueries({ include: "active" })
      },
    })
    setPopoverOpen(false)
  }
  const removeUserHandler = () => {
    void removeUserMutation({
      variables: {
        userId: userId,
      },
      onCompleted: () => {
        client.refetchQueries({ include: "active" })
      },
    })
    setPopoverOpen(false)
  }

  const openUserPage = (userId: number) => {
    window.history.pushState({prevPath: router.asPath}, '', `/users/${userId}`)
    console.log(router)
    router.push(`/users/${userId}`)
    // history.pushState({lastUrl = })
    setPopoverOpen(false)
  }

  return (
    <MorphingPopover
      className="w-full justify-end"
      open={popoverOpen}
      onOpenChange={setPopoverOpen}
    >
      <MorphingPopoverTrigger>
        <AlignCenterIcon />
      </MorphingPopoverTrigger>
      <MorphingPopoverContent
        className={cn("bg-dark-500 border-light-900 z-20", {
          "mb-[140px]": index === usersLength - 1,
          "mb-[40px]": index === usersLength - 2,
          "mt-[140px]": index === 0,
          "mt-[40px]": index === 1,
        })}
      >
        <div className="flex flex-col gap-2 mr-2">
          <MorphingPopover className="w-[300px]">
            <MorphingPopoverTrigger onClick={() => setPopoverOpen(true)}>
              <div className="flex items-center hover:text-accent-500 active:text-accent-900 text-light-500 gap-2 cursor-pointer">
                <DeleteIcon />
                <span>{t.admin.userList.actionMenu.deleteUser}</span>
              </div>
            </MorphingPopoverTrigger>
            <MorphingPopoverContent className="w-full h-full bg-dark-300 hover:bg-dark-100 flex justify-between items-center text-bold-16">
              <CheckIcon
                className="hover:bg-success-500"
                onClick={removeUserHandler}
              />
              <div className="text-light-100">
                {t.admin.userList.actionMenu.confirmation}
              </div>
              <XIcon
                className="hover:bg-danger-500"
                onClick={() => setPopoverOpen(false)}
              />
            </MorphingPopoverContent>
          </MorphingPopover>
          <MorphingPopover className="w-[300px]">
            <MorphingPopoverTrigger>
              <div className="flex items-center hover:text-accent-500 active:text-accent-900 text-light-500 gap-2 cursor-pointer">
                <BanIcon />
                <span>{t.admin.userList.actionMenu.banUser}</span>
              </div>
            </MorphingPopoverTrigger>
            <MorphingPopoverContent className="w-full h-full bg-dark-300 hover:bg-dark-100 flex justify-between items-center text-bold-16">
              <CheckIcon
                className="hover:bg-success-500"
                onClick={banUserHandler}
              />
              <div className="text-light-100">
                {t.admin.userList.actionMenu.confirmation}
              </div>
              <XIcon
                className="hover:bg-danger-500"
                onClick={() => setPopoverOpen(false)}
              />
            </MorphingPopoverContent>
          </MorphingPopover>
          <div
            className="flex items-center hover:text-accent-500 active:text-accent-900 text-light-500 gap-2 cursor-pointer m-auto"
            onClick={() => openUserPage(userId)}
          >
            <AlignCenterIcon />
            <span>{t.admin.userList.actionMenu.moreInformation}</span>
          </div>
        </div>
      </MorphingPopoverContent>
    </MorphingPopover>
  )
}
