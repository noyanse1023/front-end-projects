import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import SimpleMDE from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css"
import './App.scss'
import uuid from 'uuid/dist/v4'

const data = [
  {
    id: '1',
    title: '11111'
  },
  {
    id: '2',
    title: '2222'
  },
  {
    id: '3',
    title: '3333'
  },
  {
    id: '4',
    title: '4444'
  }
]
function App() {
  const defaultFileId = data[0].id
  const [files, setFiles] = useState(data)
  const [unSavedIds, setUnsavedIds] = useState([])
  const [activedId, setActivedId] = useState(defaultFileId)
  const [opendFileIds, setOpenedFileIds] = useState([defaultFileId])
  const [searchedFiles, setSearchedFiles] = useState()

  const opendFiles = opendFileIds.map(openId => {
    return files.find(file => file.id === openId)
  })
  const activedFile = files.find(file => file.id === activedId)
  const fileClick = (id) => {
    // set current file id
    setActivedId(id)
    // if openedfiles donnot have he current id
    // then add now file to opened files
    if (!opendFileIds.includes(id)) {
      setOpenedFileIds([
        ...opendFileIds,
        id
      ])
    }
  }
  const tabClick = (id) => {
    setActivedId(id)
  }
  const tabClose = (id) => {
    // remove id from opened ids
    const result = opendFileIds.filter(openId => openId !== id)
    setOpenedFileIds(result)
    // set active to first opened tab
    if (result.length) {
      setActivedId(result[result.length - 1])
    } else {
      setActivedId('')
    }
  }
  const fileChange = (activedId, value) => {
    // loop through array to update to new value
    const newFiles = files.map(file => {
      if (file.id === activedId) {
        file.body = value
      }
      return file
    })
    console.log('newFiles', newFiles)
    setFiles(newFiles)
    // update unsaved file ids
    if (!unSavedIds.includes(activedId)) {
      setUnsavedIds([
        ...unSavedIds,
        activedId
      ])
    }
  }
  // left pannel operations
  const deleteFile = (id) => {
    const result = files.filter(file => file.id !== id)
    console.log('delete file', id, result)
    setFiles(result)
    // close rignt pannel tab opened
    tabClose(id)
  }
  const updateFileName = (id, title) => {
    const newFiles = files.map(file => {
      if (file.id === id) {
        file.title = title
        if (file.isNew) {
          file.isNew = false
        }
      }
      return file
    })
    setFiles(newFiles)
  }
  const fileSearch = (keyword) => {
    // filter new files based on the keyword
    const newFiles = files.filter(file => file.title.includes(keyword))
    setSearchedFiles(newFiles)
  }
  const createFile = () => {
    console.log('create')
    const newId = uuid()
    const newFiles = [
      ...files,
      {
        id: newId,
        title: '',
        body: '### 请输入markdown',
        createAt: Date.now(),
        isNew: true
      }
    ]
    setFiles(newFiles)
  }
  const fileList = searchedFiles?.length ? searchedFiles : files
  return (
    <div className="App container-fluid">
      <div className="row no-gutters">
        <div className="col-3 left-pannel">
          <FileSearch onFileSearch={fileSearch} />
          <FileList files={fileList}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName} />
          <div className="row no-gutters button-group">
            <div className="col" onClick={createFile}>
              <BottomBtn
                text="新建"
                colorClass="btn-primary"
               />
            </div>
            <div className="col">
              <BottomBtn
                text="导入"
                colorClass="btn-success" />
            </div>
          </div>

        </div>
        <div className="col-9 right-pannel">
          {
            !activedId && <div className="no-opened-files">
              Please choose one file or create a new file
            </div>
          }
          {
            activedId && <>
              <TabList files={opendFiles}
              activedId={activedId}
              unSavedIds={unSavedIds}
              onClickTab={tabClick}
              onCloseTab={tabClose}
            />
            <SimpleMDE
              key={activedId}
              value={activedFile?.body}
              options={{
                minHeight: '515px'
              }}
              onChange={value => fileChange(activedId, value)} />
            </>
          }

        </div>
      </div>
    </div>
  );
}

export default App;
