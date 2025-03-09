import React from "react"

import { AlignCenterIcon } from "@/shared/animate-svg/align-center"
import { BanIcon } from "@/shared/animate-svg/ban"
import { DeleteIcon } from "@/shared/animate-svg/delete"
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "@/shared/motion-primitives/morphing-popover"
import { cn } from "@/shared/utils/cn"

interface Props {
  index: number
  usersLength: number
  userId: number
}

export const ActionWithUserMenu = ({ usersLength, index }: Props) => {
  return (
    <MorphingPopover className="w-full justify-end">
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
          <div className="flex items-center hover:text-accent-500 active:text-accent-900 text-light-500 gap-2 cursor-pointer">
            <DeleteIcon />
            <span>Delete User</span>
          </div>
          <div className="flex items-center hover:text-accent-500 active:text-accent-900 text-light-500 gap-2 cursor-pointer">
            <BanIcon />
            <span>Ban in the system</span>
          </div>
          <div className="flex items-center hover:text-accent-500 active:text-accent-900 text-light-500 gap-2 cursor-pointer">
            <AlignCenterIcon />
            <span>More information</span>
          </div>
        </div>
      </MorphingPopoverContent>
    </MorphingPopover>
  )
}
