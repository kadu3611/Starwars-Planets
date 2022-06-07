import React, { useState, useEffect } from 'react';
import response from '../testData';
// import PropTypes from 'prop-types';
import Context from './Context';

function StarProvider({ children }) {
  const [filterlist, setFilterlist] = useState([]);
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
      setFilterlist(response.results);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    apiStar();
  }, []);

  function handleChange({ target: { value } }) {
    setName({
      filterByName: {
        name: value.toLowerCase(),
      },
    });
  }
  useEffect(() => {
    if (name.filterByName.name.length > 0) {
      setFilterlist(star.filter((item) => item.name.toLowerCase()
        .includes(name.filterByName.name)));
    }
  }, [name]);

  const contextType = {
    filterlist,
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
