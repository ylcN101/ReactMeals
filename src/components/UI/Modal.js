import React from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

export const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>
}
export const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const portalElem = document.getElementById('overlays')

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalElem)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElem
      )}
    </>
  )
}

export default Modal
