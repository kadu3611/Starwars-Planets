import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import response from '../testData';
import Context from './Context';

function StarProvider({ children }) {
  const [filterlist, setFilterlist] = useState([]);
  const [star, setStar] = useState([]);
  const [filterSelect, setFilterSelect] = useState([]);
  const [inpName, setInpName] = useState({
    filterByName: {
      name: '',
    },
  });
  const [starValue, setStarValue] = useState(0);
  const [starComparison, setStarComparison] = useState('maior que');
  const [starColumn, setStarColumn] = useState('population');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const [arrayColumn, setArrayColumn] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  useEffect(() => {
    const apiStar = async () => {
      try {
        const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
        const data = await response.json();
        setStar(data.results);
        setFilterlist(data.results);
        /*
        setStar(response.results);
        setFilterlist(response.results); */
      } catch (e) {
        console.log(e);
      }
    };
    apiStar();
  }, []);

  function handleChange({ target: { value } }) {
    setInpName({
      filterByName: {
        name: value.toLowerCase(),
      },
    });
  }

  useEffect(() => {
    const starFilter = (star.filter((item) => item.name.toLowerCase()
      .includes(inpName.filterByName.name)));

    const testeFilter = filterByNumericValues
      .reduce((acc, filter) => acc.filter((world) => {
        switch (filter.comparison) {
        case 'maior que':
          return Number(world[filter.column]) > Number(filter.value);
        case 'menor que':
          return Number(world[filter.column]) < Number(filter.value);
        case 'igual a':
          return Number(world[filter.column]) === Number(filter.value);
        default:
          return true;
        }
      }), starFilter);
    setFilterlist(testeFilter);
  }, [filterByNumericValues, inpName]);

  function onFilter() {
    const option = arrayColumn.filter((elemento) => elemento !== starColumn);
    setFilterSelect(
      [
        ...filterSelect,
        { selecColumn: starColumn,
          selecComparison: starComparison,
          selecValue: starValue },
      ],
    );
    setArrayColumn(option);

    setFilterByNumericValues(

      [
        ...filterByNumericValues,
        {
          value: starValue,
          comparison: starComparison,
          column: starColumn,
        },
      ],

    );
    setStarComparison(starComparison);
    setStarColumn(option[0]);
    setStarValue(starValue);
  }

  function deleteFilter({ target }) {
    const remove = filterSelect.filter((item) => target.value !== item.selecColumn);
    const filterRemove = filterByNumericValues
      .filter((item) => target.value !== item.column);
    const add = filterSelect.filter((item) => target.value === item.selecColumn);
    setArrayColumn([...arrayColumn, add[0].selecColumn]);
    setFilterSelect(remove);
    setFilterByNumericValues(filterRemove);
    setStarColumn(add[0].selecColumn);
  }

  function deleteAll() {
    setArrayColumn(['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
    setFilterSelect([]);
    setFilterByNumericValues([]);
  }

  const contextType = {
    deleteAll,
    setStarComparison,
    setStarColumn,
    setStarValue,
    filterByNumericValues,
    deleteFilter,
    starValue,
    filterSelect,
    arrayColumn,
    filterlist,
    handleChange,
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
/*
    setFilterlist(filterlist.filter((item) => {
      if (starComparison === 'maior que') {
        return Number(item[starColumn]) > Number(starValue);
      }
      if (starComparison === 'menor que') {
        return Number(item[starColumn]) < Number(starValue);
      }
      return Number(item[starColumn]) === Number(starValue);
    })); */

/* if (world.comparison === 'maior que') {
        return Number(item.column) > Number(item.value);
      }
      if (world.comparison === 'menor que') {
        return Number(item.column) < Number(item.value);
      }
      return Number(item.column) === Number(item.value); */
