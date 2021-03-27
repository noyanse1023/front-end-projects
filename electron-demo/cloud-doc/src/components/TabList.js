import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './TabList.scss'

const TabList = ({files, activedId, unSavedIds, onClickTab, onCloseTab}) => {
  return (
    <ul className="nav nav-tabs tablist-component">
      {
        files.map(file => {
          const unsavedMark = unSavedIds.includes(file?.id)
          const fClassNames = classnames({
            'nav-link': true,
            'active': file?.id === activedId,
            'with-unsaved': unsavedMark
          })

          return (
            <li className="nav-item" key={file.id}>
              <a href="#" className={fClassNames}
                onClick={(e)=>{e.preventDefault(); onClickTab(file.id)}}>
                {file.title}
                <i onClick={(e)=>{e.preventDefault(); e.stopPropagation(); onCloseTab(file.id)}} className="close close-icon ml-2">x</i>
                {
                  unsavedMark && <span className="rounded-circle unsaved-icon ml-2"></span>
                }
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}

TabList.propTypes = {
  files: PropTypes.array,
  activedId: PropTypes.string,
  unSavedIds: PropTypes.array,
  onClickTab: PropTypes.func,
  onCloseTab: PropTypes.func
}

TabList.defaultProps = {
  unSavedIds: []
}

export default TabList
