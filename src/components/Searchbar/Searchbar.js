// import React, {Component} from "react";
import {useState} from "react";
import PropTypes from "prop-types";
import css from "./Searchbar.module.css";
import { toast } from 'react-toastify';

const Searchbar = ({onSubmit}) => {
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




// class Searchbar extends Component {
//   state = { 
//     searchName: '', 
//   }; 

//   handleChange = event => {
//     const { name, value } = event.currentTarget;
//     this.setState({ [name]: value});
//   }  
  
//   handleSubmit = event => {
//     event.preventDefault();

//     const { searchName } = this.state;

//     if (searchName.trim() === '') {
//       toast('Enter request to search');  
//       return;
//     }

//     this.props.onSubmit(searchName); 

//     this.setState({ searchName: '' });
//   }

//   render () {
//     return (
//     <header className={css.Searchbar}>
//       <form className={css.form} onSubmit={this.handleSubmit}>
//         <button type="submit" className={css.button}>
//           <span className={css.buttonLabel}>Search</span>
//         </button>

//         <input
//           className={css.input}
//           type="text"
//           name="searchName"
//           value={this.state.searchName}
//           onChange={this.handleChange}
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//         />
//       </form>
//     </header>
//   )} 
// }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Searchbar;