import React, { ComponentProps } from "react"

import { LanguageSelect } from "@/features/language-select/LanguageSelect"
import { cn } from "@/shared/utils/cn"

export type HeaderProps = {
  isLoading?: boolean
} & ComponentProps<"header">

export const Header = ({ className, ...rest }: HeaderProps) => {
  return (
    <header
      {...rest}
      className={cn(
        "flex  px-[16px] md:pl-0 w-full h-[60px] md:pr-16 items-center justify-between bg-dark-700 text-light-100 min-w-[360px] border-b border-b-dark-300",
        className
      )}
    >
      <span className="pl-0 md:pl-[5%] cursor-pointer">Instagram admin</span>

      <div className="flex items-center gap-4">
        {/*<NotificationComponent />*/}
        <LanguageSelect />
      </div>
    </header>
  )
}
