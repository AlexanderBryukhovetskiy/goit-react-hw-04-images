import axios from 'axios';

const fetchPictures = async (searchName, page) => {

  console.log('This is a searchName in function "fetchPictures" : ', searchName);

  console.log('This is number of page in function "fetchPictures" : ', page);

  const KEY = "30822963-d0fd13470d1d847e8cb7d7e51";
  
  const response = await axios.get(`https://pixabay.com/api/?q=${searchName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);

  return response;
}

export default fetchPictures;