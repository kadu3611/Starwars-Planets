import React, { useContext } from 'react';
import Context from '../context/Context';
import Header from './Hedear';

function Table() {
  const { star, handleChange } = useContext(Context);
  console.log(star);
  return (
    <body>
      <input
        data-testid="name-filter"
        name="filtro"
        onChange={ handleChange }
      />
      <table>
        <Header />
        <tbody>
          {

            star.map((item, index) => (
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
