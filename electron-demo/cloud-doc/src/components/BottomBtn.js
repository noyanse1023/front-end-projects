import React from 'react'
import PropTypes from 'prop-types'

const BottomBtn = ({text, colorClass, onBtnClick}) => {
    return (
        <button
            type="button"
            className={`btn btn-block no-border ${colorClass}`}
            onClick={onBtnClick}>
            {text}
        </button>
    )
}

BottomBtn.propTypes = {
    text: PropTypes.string,
    colorClass: PropTypes.string,
    onBtnClick: PropTypes.func
}

export default BottomBtn
