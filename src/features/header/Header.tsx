import React, { ComponentProps } from "react"

import { LanguageSelect } from "@/features/language-select/LanguageSelect"
import { TextEffect } from "@/shared/motion-primitives/text-effect"
import { cn } from "@/shared/utils/cn"

export type HeaderProps = {
  isLoading?: boolean
} & ComponentProps<"header">

export const Header = ({ className, ...rest }: HeaderProps) => {
  return (
    <header
      {...rest}
      className={cn(
        "flex px-[16px] md:pl-0 w-full h-[60px] md:pr-16 items-center justify-between bg-dark-700 text-light-100 min-w-[360px] border-b border-b-dark-300",
        className
      )}
    >
      <TextEffect
        per="char"
        delay={0.5}
        variants={{
          container: {
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              rotateX: 90,
              y: 10,
            },
            visible: {
              opacity: 1,
              rotateX: 0,
              y: 0,
              transition: {
                duration: 0.2,
              },
            },
          },
        }}
        className="pl-0 md:pl-[5%] cursor-pointer"
      >
        Instagram admin
      </TextEffect>
      <div className="flex items-center gap-4">
        {/*<NotificationComponent />*/}
        <LanguageSelect />
      </div>
    </header>
  )
