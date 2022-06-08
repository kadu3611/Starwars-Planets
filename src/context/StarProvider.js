import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import response from '../testData';
import Context from './Context';

function StarProvider({ children }) {
  console.log(children);
  const [filterlist, setFilterlist] = useState([]);
  const [star, setStar] = useState([]);
  const [inpName, setInpName] = useState({
    filterByName: {
      name: '',
    },
  });
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  );
  const apiStar = async () => {
    try {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const data = await response.json();
      setStar(data);
      setFilterlist(data);
      /* setStar(response.results);
      setFilterlist(response.results); */
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    apiStar();
  }, []);

  function handleChange({ target: { value } }) {
    setInpName({
      filterByName: {
        name: value.toLowerCase(),
      },
    });
  }

  function handleChangeFilter({ target: { value, id } }) {
    setFilterByNumericValues({
      ...filterByNumericValues,
      [id]: value,
    });
  }

  useEffect(() => {
    if (inpName.filterByName.name.length > 0) {
      setFilterlist(star.filter((item) => item.name.toLowerCase()
        .includes(inpName.filterByName.name)));
    }
  }, [inpName]);

  function onFilter() {
    const { value, comparison, column } = filterByNumericValues;
    setFilterlist(filterlist.filter((item) => {
      /* if (item[column] === 'unknown') {
        item[column] = 0;
      } */
      if (comparison === 'maior que') {
        return Number(item[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(item[column]) < Number(value);
      }
      return Number(item[column]) === Number(value);
    }));
  }

  const contextType = {
    filterlist,
    filterByNumericValues,
    handleChange,
    handleChangeFilter,
    onFilter,
  };
  return (
    <Context.Provider value={ contextType }>
      {children}
    </Context.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.objectOf.isRequired,
};

export default StarProvider;
