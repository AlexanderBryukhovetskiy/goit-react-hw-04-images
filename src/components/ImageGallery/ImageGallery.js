import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";
import ImageGalleryItem from "components/ImageGalleryItem";

const ImageGallery = ({ imageList }) => {

  return (
    <ul className={css.ImageGallery }>
      {imageList.map( imageListItem => (
        <ImageGalleryItem data={imageListItem} key={imageListItem.id}/>))
      }
    </ul>
  )
};

ImageGallery.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired
  })),
};

export default ImageGallery;

//переписано на хуки