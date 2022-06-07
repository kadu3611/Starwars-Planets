import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Context from './Context';

function StarProvider({ children }) {
  const [star, setStar] = useState([]);
  const apiStar = async () => {
    try {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const data = await response.json();
      setStar(data.results);
    } catch (e) {
      console.log(e);
    }
  };
  const contextType = {
    apiStar,
    star,
  };
  return (
    <Context.Provider value={ contextType }>
      {children}
    </Context.Provider>
  );
}

/* StarProvider.propTypes = {
  children: PropTypes.objectOf.isRequired,
}; */

export default StarProvider;
