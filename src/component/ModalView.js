import React from 'react'
import './ModalView.scss'
function ModalView({ closeModal, currentValue }) {

  return (
    <div className='modal-view'>
      <div className='modal-viewer'>
        <div className='modal-view-details'>
          <img className='modal-img' src={currentValue.photo} />
          <h2 className='modal-book-name'>{currentValue.bookName}</h2>
          <h3 className='modal-author'>{currentValue.author}</h3>
          <p className='modal-description'>{currentValue.description}</p>
          <button className='continuos-button' onClick={() => closeModal(false)}>Continoue Reading</button>
        </div>
      </div>

    </div>
  )
}

export default ModalView