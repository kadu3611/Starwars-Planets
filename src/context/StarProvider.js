import React, { useState, useEffect } from 'react';
import response from '../testData';
// import PropTypes from 'prop-types';
import Context from './Context';

function StarProvider({ children }) {
  const [star, setStar] = useState([]);
  const [name, setName] = useState({
    filterByName: {
      name: '',
    },
  });

  const apiStar = async () => {
    try {
      // const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      // const data = await response.json();
      setStar(response.results);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    apiStar();
  }, []);

  useEffect(() => {
    if (name.filterByName.name.length !== 0) {
      apiStar();
      setStar(star.filter((item) => item.name.includes(name.filterByName.name)));
    } else { apiStar(); }

    // console.log(teste);
  }, [name]);

  function handleChange({ target: { value } }) {
    setName({
      filterByName: {
        name: value,
      },
    });
  }

  const contextType = {
    star,
    handleChange,
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
