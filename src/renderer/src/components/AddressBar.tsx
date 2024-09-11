import React, { useState } from 'react'
import '../assets/styles.css'

const AddressBar = ({
  url,
  setUrl,
  goBack,
  goForward
}: {
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  goBack: () => void
  goForward: () => void
}): JSX.Element => {
  // Local state to hold the input value
  const [inputValue, setInputValue] = useState(url)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setUrl(inputValue)
      // console.log('the entered URL is' + url)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  return (
    <nav className="navbar bg-primary text-white p-2 border-bottom-dark sticky-top" id="drag">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <button onClick={goBack} id="no-drag" className="btn btn-secondary me-2 pointer-cursor">
            ←
          </button>
          <button
            onClick={goForward}
            id="no-drag"
            className="btn btn-secondary me-2 pointer-cursor"
          >
            →
          </button>
          <input
            type="text"
            className="form-control border-primary shadow-sm"
            id="no-drag"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
        </div>
      </div>
    </nav>
  )
}

export default AddressBar
