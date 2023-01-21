import React, { Component }  from "react";
import {createPortal} from 'react-dom';
import PropTypes from "prop-types";
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

  componentDidMount() { 
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {  
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  }

  handleOverlayClick = (event) => {
    console.log('event.target: ', event.target);
    console.log('event.currentTarget :', event.currentTarget);
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  }

  render() {
    return createPortal (
      <div className={css.Overlay} onClick={this.handleOverlayClick}>
        <div className={css.Modal} >
          {this.props.children}
        </div>
      </div> , 
      modalRoot,
    )
  };
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal;