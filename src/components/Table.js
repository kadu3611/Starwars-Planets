import React, { useContext } from 'react';
import Context from '../context/Context';
import Header from './Hedear';

function Table() {
  const { filterlist, handleChange, onFilter, arrayColumn,
    filterSelect, deleteFilter, starValue, setStarComparison, setStarColumn,
    setStarValue, deleteAll } = useContext(Context);
  return (
    <body>
      <input
        data-testid="name-filter"
        name="filtro"
        onChange={ handleChange }
      />
      <label htmlFor="column">
        Coluna
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => setStarColumn(target.value) }
          id="column"
        >
          {
            arrayColumn.map((item, index) => (
              <option key={ index } value={ item }>
                {item}
              </option>
            ))
          }
        </select>
      </label>
      <label htmlFor="comparison">
        Operador
        <select
          id="comparison"
          data-testid="comparison-filter"
          onChange={ ({ target }) => setStarComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ ({ target }) => setStarValue(target.value) }
        id="value"
        value={ starValue }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ onFilter }
      >
        FILTRAR
      </button>
      {
        filterSelect.map((item, index) => (
          <p
            data-testid="filter"
            key={ index }
          >
            {' '}
            {item.selecColumn}
            {' '}
            {item.selecComparison}
            {' '}
            {item.selecValue}
            {' '}
            <button
              type="button"
              value={ item.selecColumn }
              onClick={ deleteFilter }
            >
              delete
            </button>
          </p>
        ))
      }
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deleteAll }
      >
        Remover todas filtragens
      </button>
      <table>
        <Header />
        <tbody>
          {

            filterlist.map((item, index) => (
              <tr key={ index }>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.orbital_period}
                </td>
                <td>
                  {item.rotation_period}
                </td>
                <td>
                  {item.diameter}
                </td>
                <td>
                  {item.climate}
                </td>
                <td>
                  {item.gravity}
                </td>
                <td>
                  {item.terrain}
                </td>
                <td>
                  {item.surface_water}
                </td>
                <td>
                  {item.population}
                </td>
                <td>
                  {item.films}
                </td>
                <td>
                  {item.created}
                </td>
                <td>
                  {item.edited}
                </td>
                <td>
                  {item.url}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </body>
  );
}

export default Table;
