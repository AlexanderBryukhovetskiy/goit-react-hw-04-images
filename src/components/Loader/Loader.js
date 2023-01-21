import React from "react";
import css from "./Loader.module.css";
import { Circles } from 'react-loader-spinner'
  <Circles
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />;

  const Loader = () => {
    return (
      <div className={css.spinner}> <Circles/> </div>
    )
  };

  export default Loader;