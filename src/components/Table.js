import React, { useContext } from 'react';
import Context from '../context/Context';
import Header from './Hedear';

function Table() {
  const { filterlist,
    filterByNumericValues,
    handleChange,
    handleChangeFilter,
    onFilter,
    arrayColumn,
    filterSelect } = useContext(Context);
    console.log(filterSelect);
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
          onChange={ handleChangeFilter }
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
          onChange={ handleChangeFilter }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ handleChangeFilter }
        id="value"
        value={ filterByNumericValues.value }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ onFilter }
      >
        FILTRAR
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
