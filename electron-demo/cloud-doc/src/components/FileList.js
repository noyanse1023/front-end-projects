import React, {useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

const FileList = (props) => {
    const { files, onFileClick, onSaveEdit, onFileDelete } = props
    const [ editStatus, setEditStatus ] = useState(false)
    const [ value, setValue ] = useState('')
    const node = useRef(null)

    const closeSearch = (editItem) => {
        setEditStatus(false)
        setValue('')
        if (editItem.isNew) {
            onFileDelete(editItem.id)
        }
    }

    useEffect(() => {
        const isNewFile = files.find(file => file.isNew)
        if (isNewFile) {
            setEditStatus(isNewFile.id)
        }
    }, [files])

    const keyDown = useKeyPress(13)
    const esc = useKeyPress(27)
    useEffect(() => {
        const editItem = files.find(file => file.id === editStatus)
        if (keyDown && editStatus && value.trim() !== '') {
            onSaveEdit(editStatus, value)
            closeSearch()
        } else if (esc && editStatus) { // esc
            closeSearch(editItem)
        }
    })
    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li key={file.id} className="list-group-item row no-gutters bg-light d-flex justify-content-between align-items-center file-item">
                        {((file.id !== editStatus) && !file.isNew) &&
                            <>
                                <span className="col-6" onClick={() => {onFileClick(file.id)}}>{file.title}</span>
                                <span className="c-link" 
                                    onClick={() => {setEditStatus(file.id); setValue(file.title)}}>编辑</span>
                                <span onClick={() => {onFileDelete(file.id)}}>删除</span>
                            </>
                        }
                        {
                            ((file.id === editStatus) || file.isNew) &&
                            <>
                                <div className="d-flex justify-content-between align-items-center">
                                    <input className="form-control" value={value}
                                        ref={node}
                                        onChange={(e) => {setValue(e.target.value)}} />
                                    <div onClick={() => closeSearch(file)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                </div>
                            </>
                        }

                    </li>
                ))
            }
        </ul>
    )
}

FileList.propTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileDelete: PropTypes.func,
    onSaveEdit: PropTypes.func
}
export default FileList
