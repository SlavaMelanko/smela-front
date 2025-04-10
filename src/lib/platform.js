export const isApple = () => /Mac|iPhone|iPad|iPod/.test(navigator.platform)

export const isWindows = () => /Win/.test(navigator.platform)

export const isLinux = () => /Linux/.test(navigator.platform)

export const isMobile = () => /Mobile|Tablet/.test(navigator.platform)

export const isDesktop = () => !isMobile()
