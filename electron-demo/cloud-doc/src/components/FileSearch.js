import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  const node = useRef(null)

  const closeEvent = () => {
    setInputActive(false)
    setValue('')
    onFileSearch('')
  }
  const keyDown = useKeyPress(13)
  const esc = useKeyPress(27)
  useEffect(() => {
    if (keyDown && inputActive) { // enter
      onFileSearch(value)
    } else if (esc && inputActive) { // esc
      closeEvent()
    }
  })

  // 设置focus也是副作用
  useEffect(() => {
    if (inputActive) {
      node.current.focus()
    }
  }, [inputActive]) // inputActive 改变的时候才调用focus
  return (
    <div className="alert alert-primary">
      { !inputActive &&
        <div className="d-flex justify-content-between align-items-center">
          <span>{title}</span>
          <div onClick={() => {setInputActive(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </div>
        </div>
      }
      { inputActive &&
        <div className="d-flex justify-content-between align-items-center">
          <input className="form-control" value={value}
            ref={node}
            onChange={(e) => {setValue(e.target.value)}} />
          <div onClick={closeEvent}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
        </div>
      }
    </div>
  )
}

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired,
}

FileSearch.defaultProps = {
  title: '我的云文档',
}

export default FileSearch
