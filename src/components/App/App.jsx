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
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(()=> {

    if (isFirstRender){
      setIsFirstRender(false);
      return;
    };

    console.log('Search name changed');
    
    if (!searchName){
      return
    };

    try{
      setLoading(true);

      const response = fetchPictures(searchName, page);
          console.log('response :', response);

      // async function getResponse (searchName, page) {
      //   await fetchPictures(searchName, page)};

      // const response = getResponse();
      //     console.log('response :', response);

      setTotalImages(response.data.totalHits);
          console.log('totalImages :', totalImages);

      if ( totalImages === 0 ) {
        return toast(`There are no pictures by word ${searchName}`);
      }

      if ( totalImages > 0 ) {
        setImageList(response.data.hits);
        //setTotalImages(response.data.totalHits);
      } 
      else {
        return Promise.reject(new Error(`There are no pictures by word ${searchName}`));
      }
    }
    catch(error) { 
      setError(error);
    }
    finally { setLoading(false) };
  }, [searchName]);


  useEffect(()=> {
    if (isFirstRender){
      setIsFirstRender(false);
      return;
    };

    console.log('Page number changed');
    
    try{
      setLoading(true);

      const response = fetchPictures(searchName, page);
      const nextPageImages = response.data.hits;

      setImageList([...imageList, ...nextPageImages]);

      console.log(`imageList of ${page} pages :`, imageList);
    } 
    catch(error) { 
      setError(error);
    }
    finally { setLoading(false) };
  }, [page]);


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

// export class App extends Component {
//   state = {
//     searchName: '',
//     imageList: [],
//     page: 1,
//     totalImages: 0,
//     error: null,
//     loading: false,
//   };

//   async componentDidUpdate(_, prevState) {

//     const { searchName, page } = this.state;

//     if (prevState.searchName !== searchName || prevState.page !== page) {
//       console.log('Search name or page number changed');
  
//       try{
  //       this.setState( { loading: true } );

  //       const response = await fetchPictures(searchName, page);
  //       const totalImages = response.data.totalHits;

  //       if ( totalImages === 0 ) {
  //         return toast(`There are no pictures by word ${searchName}`);
  //       }
        
  //       if ( totalImages > 0 ) {

  //         console.log("totalImages :", totalImages);

  //         const imageList = response.data.hits;

  //         if ( prevState.searchName !== searchName ) {
  //           this.setState( { 
  //             imageList, 
  //             totalImages,
  //           });
  //         } 
  //         else {
  //           const newList = [...prevState.imageList, ...imageList];
  //           console.log('newList :', newList);

  //           this.setState( { 
  //             imageList: newList, 
  //             totalImages,
  //           });
  //         }
  //       } 
  //       else {
  //         return Promise.reject(new Error(`Нет картинок по запросу ${searchName}`));
  //       }
  //     }
  //     catch(error) { 
  //       this.setState( {error} );
  //     }
  //     finally { this.setState( {loading: false} ) };
  //   };
  // };

//   handleSearchSubmit = searchName => {
//     this.setState({ 
//       imageList: [],
//       page: 1,
//       searchName,
//     });
//   };

//   loadMore = () => {
//     this.setState( prevState => ({
//       page: prevState.page + 1,
//     }))
//   };

//   render () {
//     const { totalImages, searchName, imageList, loading, error } = this.state;

//     return (  
//       <>
//         <Searchbar onSubmit={this.handleSearchSubmit}/>

//         <div className={css.App}>
//           { error && (<h1> There are no images by search name ${searchName}. Please try input another word</h1>) }

//           { loading && <Loader/> }

//           { !imageList.length && !loading && <p className={css.serviceMessage}>Please enter search word</p> }

//           { imageList.length > 0 && 
//             <div className={css.App}>
//               <ImageGallery imageList={imageList}/> 

//               { loading && <Loader/> }

//               { imageList.length > 0 
//                 && imageList.length < 500
//                 && imageList.length < totalImages 
//                 && <Button onClick={ this.loadMore }/>
//               }
//             </div>
//           }

//           <ToastContainer autoClose={3000}/> 
//         </div>
//       </>
//     )
//   };
// };

