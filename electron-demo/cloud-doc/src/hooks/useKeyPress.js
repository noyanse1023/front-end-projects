import {useState, useEffect } from 'react'

const useKeyPress = targetKeyCode => {
    const [isPressed, setIsPressed] = useState(false)
    const keydownHandler = e => {
        if (e.keyCode === targetKeyCode) {
            setIsPressed(true)
        }
    }
    const keyupHandler = e => {
        if (e.keyCode === targetKeyCode) {
            setIsPressed(false)
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', keydownHandler)
        document.addEventListener('keyup', keyupHandler)
        return () => {
            document.removeEventListener('keydown', keydownHandler)
            document.removeEventListener('keyup', keyupHandler)
        }
    }) // 刚加载的时候触发
    return isPressed
}

export default useKeyPress
