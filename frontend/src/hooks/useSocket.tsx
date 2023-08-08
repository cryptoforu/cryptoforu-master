import useWebSocket from 'react-use-websocket'
import { useEffect, useState } from 'react'

const defaultUrl = `${process.env.NEXT_PUBLIC_API_URL_SOCKET}/prices?assets=bitcoin,ethereum,binance-coin,solana,cardano,ripple`

const useSocket = (url?: string) => {
  let socketUrl = url || defaultUrl

  const [messageHistory, setMessageHistory] = useState({})
  const { lastJsonMessage, lastMessage } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => true,
  })
  useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessageHistory(lastJsonMessage)
    }
  }, [lastJsonMessage, setMessageHistory])
  return messageHistory
}
export default useSocket
