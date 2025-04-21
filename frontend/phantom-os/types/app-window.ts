export interface AppWindow {
  id: string
  appId: string
  title: string
  position: {
    x: number
    y: number
  }
  size: {
    width: number
    height: number
  }
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}
