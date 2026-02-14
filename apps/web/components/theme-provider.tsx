"use client"

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ComponentProps } from "react"
import { useEffect } from "react"

function ThemeSync() {
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    const resolvedTheme = theme === "system" ? systemTheme : theme
    document.documentElement.setAttribute(
      "data-color-mode",
      resolvedTheme === "dark" ? "dark" : "light"
    )
  }, [theme, systemTheme])

  return null
}

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSync />
      {children}
    </NextThemesProvider>
  )
}
