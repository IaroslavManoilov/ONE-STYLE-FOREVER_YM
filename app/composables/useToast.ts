import { useState } from '#app'

export type ToastType = 'success' | 'info'

export function useToast() {
  const isVisible = useState<boolean>('app-toast-visible', () => false)
  const message = useState<string>('app-toast-message', () => '')
  const type = useState<ToastType>('app-toast-type', () => 'success')
  const timer = useState<ReturnType<typeof setTimeout> | null>('app-toast-timer', () => null)

  function hide() {
    isVisible.value = false
  }

  function show(nextMessage: string, nextType: ToastType = 'success', duration = 2200) {
    message.value = nextMessage
    type.value = nextType
    isVisible.value = true

    if (timer.value) {
      clearTimeout(timer.value)
    }

    if (import.meta.client) {
      timer.value = setTimeout(() => {
        isVisible.value = false
      }, duration)
    }
  }

  return {
    isVisible,
    message,
    type,
    show,
    hide
  }
}
