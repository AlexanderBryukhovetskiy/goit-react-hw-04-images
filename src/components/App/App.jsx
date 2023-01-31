import { useState, useEffect } from "react";
import css from "./App.module.css";
import Searchbar from "../Searchbar";
import ImageGallery from "components/ImageGallery";
import fetchPictures from '../functions';
import Button from "components/Button";
import Loader from "components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [searchName, setSearchName] = useState('');
  const [imageList, setImageList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(()=> {
    
    if (!searchName){
      return
    };

    const searchImages = async () => {
      try {
        setLoading(true);

        const response = await fetchPictures(searchName, page);
        setTotalImages(response.data.totalHits);
      
        if ( response.data.totalHits === 0 ) {
          return toast(`There are no pictures by word ${searchName}`);
        }

        if (response.data.totalHits > 0 ) {
          setImageList((prevList) => [...prevList, ...response.data.hits]);
        } 
        else {
          return Promise.reject(new Error(`There are no pictures by word ${searchName}`));
        }
      }
      catch(error) { 
        setError(error);
      }
      finally { setLoading(false) };
    }
    searchImages();
  }, [searchName, page]);

  const handleSearchSubmit = searchName => {
    setImageList( [] );
    setPage(1);
    setSearchName(searchName);
  };

  const loadMore = () => {
    setPage(page+1);
  };

  return (  
    <>
      <Searchbar onSubmit={handleSearchSubmit}/>

      <div className={css.App}>
        { error && (<h1 className={css.serviceMessage}> There are no images by search name "{searchName}". Please try input another word</h1>) }

        { loading && <Loader/> }

        { !imageList.length && !loading && <p className={css.serviceMessage}>Please enter search word</p> }

        { imageList.length > 0 && 
          <div className={css.App}>
            <ImageGallery imageList={imageList}/> 

            { loading && <Loader/> }

            { imageList.length > 0 
              && imageList.length < 500
              && imageList.length < totalImages 
              && <Button onClick={loadMore}/>
            }
          </div>
        }

        <ToastContainer autoClose={3000}/> 
      </div>
    </>
  )
};

export default App;

//переписано на хуки
