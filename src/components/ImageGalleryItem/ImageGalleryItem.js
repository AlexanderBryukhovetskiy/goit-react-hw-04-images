import { useState } from "react";
import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";
import Modal from "components/Modal";


const ImageGalleryItem = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  
  const toggleModal = () => { 
    setShowModal( showModal => !showModal );
    if (largeImageURL !== null) {
      setLargeImageURL( largeImageURL );
    } 
    else {  
      setLargeImageURL(null); 
    };
  };

  return (
    <li id={data.id} className={css.ImageGalleryItem} >
      <img onClick={toggleModal} src={data.webformatURL} alt="" 
        className={css.ImageGalleryItem__Image} />
      {showModal && 
      <Modal onClose={toggleModal}>
        <img src={data.largeImageURL} alt=""/>
      </Modal>}
    </li>
  )
}

ImageGalleryItem.propTypes = {
  data: PropTypes.shape ({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;