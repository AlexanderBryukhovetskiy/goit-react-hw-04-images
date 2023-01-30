import { useEffect } from "react";
import {createPortal} from 'react-dom';
import PropTypes from "prop-types";
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {

  useEffect(() => { 
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      console.log('EventListener keydown  removed !');
      window.removeEventListener('keydown', handleKeyDown);}
  });

  const handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      console.log('escape pressed'); 
      onClose();
    }
  }

  const handleOverlayClick = (event) => {
    console.log('event.target: ', event.target);
    console.log('event.currentTarget :', event.currentTarget);
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return createPortal (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal} >
        {children}
      </div>
    </div> , 
    modalRoot,
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal;

