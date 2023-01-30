import {useState} from "react";
import PropTypes from "prop-types";
import css from "./SearchBar.module.css";
import { toast } from 'react-toastify';

const SearchBar = ({onSubmit}) => {
  const [searchName, setSearchName] = useState('');

  const handleChange = event => {
    const { value } = event.currentTarget;
    setSearchName(value);
  }  
  
  const handleSubmit = event => {
    event.preventDefault();

    if (searchName.trim() === '') {
      toast('Enter request to search');  
      return;
    }

    onSubmit(searchName); 

    setSearchName('');
  }

  return (
    <header className={css.Searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          name="searchName"
          value={searchName}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  ) 
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;

//переписано на хуки