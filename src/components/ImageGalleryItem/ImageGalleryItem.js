import React, {Component} from "react";
import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";
import Modal from "components/Modal";

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    largeImageURL: null,
  }

  toggleModal = () => { 
    const  { showModal, largeImageURL } = this.state;

    this.setState(  { showModal: !showModal } );

    if (largeImageURL !== null) {
      this.setState( { largeImageURL } );
    } 
    else {  
      this.setState( { largeImageURL: null } ); 
    };
  };

  render () {
    const  { showModal } = this.state;
    const { data } = this.props;

    return (
        <li id={data.id} className={css.ImageGalleryItem} >
          <img onClick={this.toggleModal} src={data.webformatURL} alt="" 
            className={css.ImageGalleryItem__Image} />
          {showModal && 
          <Modal onClose={this.toggleModal}>
            <img src={data.largeImageURL} alt=""/>
          </Modal>}
        </li>

        // <>  
        // <li onClick={this.toggleModal} 
        //     id={data.id} className={css.ImageGalleryItem} >
        //   <img src={data.webformatURL} alt="" 
        //     className={css.ImageGalleryItem__Image} />
        // </li>
        // {showModal && 
        // <Modal onClose={this.toggleModal}>
        //   <img src={data.largeImageURL} alt=""/>
        // </Modal>}
        // </>
    )
  }
}

ImageGalleryItem.propTypes = {
  data: PropTypes.shape ({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;