import * as React from 'react'
import View, { IViewProps } from '../View'
import Mitt, { Handler } from 'mitt'
import NotificationBubble from '../NotificationBubble'
import Message from '../Message'

const emitter = new Mitt()

const send = (message: string, type: string) => {
  emitter.emit(type, message)
}

export const sendSuccess = (message: string) => send(message, 'success')
export const sendWarning = (message: string) => send(message, 'warning')
export const sendInfo = (message: string) => send(message, 'info')

interface INotificationBubbleManager {
  readonly renderBubble?: ({
    key,
    onTimeout,
    children,
  }: {
    key: number
    onTimeout: () => void
    children: string
  }) => React.ReactNode
}

const NotificationBubbleManager: React.FC<
  INotificationBubbleManager & IViewProps
> = ({ children, renderBubble, ...props }) => {
  const [messages, setMessages] = React.useState<Message[]>([])

  const handleEvent = React.useCallback(
    (type, message) =>
      setMessages(messages => [...messages, new Message(type, message)]),
    [],
  )

  const handleTimeout = React.useCallback(
    () => setMessages(messages => messages.slice(1)),
    [],
  )

  const doRenderBubble = React.useCallback(
    (message: Message) =>
      renderBubble ? (
        renderBubble({
          key: message.id,
          onTimeout: handleTimeout,
          children: message.text,
        })
      ) : (
        <NotificationBubble key={message.id} onTimeout={handleTimeout}>
          {message.text}
        </NotificationBubble>
      ),
    [handleTimeout, renderBubble],
  )

  React.useEffect(() => {
    emitter.on('*', handleEvent as Handler)

    return () => emitter.off('*', handleEvent as Handler)
  }, [handleEvent])

  const message = messages[0]

  return (
    <View {...props}>
      {message && doRenderBubble(message)}
      {children}
    </View>
  )
}

export default NotificationBubbleManager
