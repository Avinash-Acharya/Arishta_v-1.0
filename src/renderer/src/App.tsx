// src/renderer/src/App.tsx

import { useEffect, useRef, useState } from 'react'
import './assets/styles.css'
import AddressBar from './components/AddressBar'
import useWindowsDimensions from './hooks/useWindowsDimensions'
// import Splash from './components/Splash'

function App(): JSX.Element {
  const [url, setUrl] = useState<string>('')
  const [history, setHistory] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const windowDimensions = useWindowsDimensions()
  const webviewRef = useRef<HTMLWebViewElement>(null)

  const goBack = (): void => {
    const newIndex = Math.max(currentIndex - 1, 0)
    setCurrentIndex(newIndex)
    setUrl(history[newIndex])
    console.log('went Back')
  }

  const goForward = (): void => {
    const newIndex = Math.min(currentIndex + 1, history.length - 1)
    setCurrentIndex(newIndex)
    setUrl(history[newIndex])
    console.log('went froward')
  }

  useEffect(() => {
    // Function to update history and current index
    const updateHistory = (newUrl: string): void => {
      const newHistory = [...history.slice(0, currentIndex + 1), newUrl]
      setHistory(() => newHistory)
      setCurrentIndex(() => newHistory.length - 1)
      // console.log('updated history')
      // console.log(url)
    }
    updateHistory(url)
  }, [url])

  return (
    <>
      <AddressBar setUrl={setUrl} url={url} goBack={goBack} goForward={goForward} />
      {url ? (
        <webview
          ref={webviewRef}
          src={`${url.includes('https://') ? '' : 'https://'}${url}`}
          style={{
            height: windowDimensions.height - 54
          }}
        ></webview>
      ) : (
        <webview
          ref={webviewRef}
          src={'https://google.com/'}
          style={{
            height: windowDimensions.height - 54
          }}
        ></webview>
        // <Splash />
      )}
    </>
  )
}

export default App
