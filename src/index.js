/**@jsx jsx */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Global, css, jsx } from '@emotion/core';
import './styles.css';

/**
 * @function repeat - repeat unit value
 * @param { string } repetitions
 * @param { string } unit - unit to repeat (fr, px, rem etc)
 * @param { bool } ie - internet explorer 10 & 11
 * @returns { string } - unit repeated
 * @example
 *  // returns (3fr)[4];
 *  repeat(4, '3fr', true);
 * @example
 *  // returns 3fr 3fr 3fr 3fr
 *  repeat(4, '3fr');
 */
const repeat = (repetitions, unit = '1fr', ie = false) => {
  let str;
  ie
    ? (str = `(${unit})[${repetitions}]`)
    : (str = unit + ' ');
  return ie ? str : str.repeat(repetitions);
};

console.log('str-ie: ', repeat(4, '3fr', true));
console.log('str: ', repeat(4, '3fr'));

/**
 * @function gridColumn -uses `span` by default pass false to specify grid line end
 * @param {}
 */
const gridColumn = (start, end, span = true) => {
  return `
    grid-column: ${start}/ ${span ? `span ${end}` : end};
  `;
};

console.log('gridColumn: ', gridColumn(1, 3));
console.log(
  'gridColumn no span: ',
  gridColumn(1, 4, false)
);

const gridSpec = {
  mobile: {
    gridTemplateColumns: `1px ${repeat(6, '1fr')} 1px`,
    gridColumnGap: '1.25rem'
  },
  tablet: {
    gridTemplateColumns: `1px ${repeat(8, '1fr')} 1px`,
    gridColumnGap: '1.875rem'
  },
  desktop: {
    gridTemplateColumns: `1px ${repeat(12, '1fr')} 1px`,
    gridColumnGap: '2.5rem'
  }
};

/**
 * @function grid
 * @param {object} - grid definitions
 */
const grid = gridSpec => {
  console.log('gridSpec: ', gridSpec);
  return `
    display: -ms-grid;
    display: grid; 
  `;
};

export const Section = props => {
  const section = css`
    ${grid(gridSpec)};
    -ms-grid-columns: ${repeat(3, '3fr', true)};
    grid-template-columns: 2fr ${repeat(3, '3fr')};
    margin: 0 0 2rem;
    // props as value(s)
    padding: ${props.fullWidth ? 0 : '2rem'};
    background-color: gold;
  `;
  const header = css`
    ${gridColumn(1, 5)};
    ${gridColumn(1, -1, false)};
    background-color: darkkhaki;
  `;
  const heading = css`
    text-transform: uppercase;
    letter-spacing: 0.0625rem;
    color: #fff;
  `;
  const body = css`
    background-color: #ccc;
    min-height: 2rem;
    // props as key(s) and value(s)
    ${props.fullWidth
      ? `
        margin-bottom: 2rem;
        padding: 0;

        @media (min-width: 800px) {
          margin-bottom: 4rem;
        }
        `
      : 'padding: 2rem'}
  `;
  return (
    <section css={section}>
      <header css={header}>
        <h2 css={heading}>{props.name}</h2>
      </header>
      <div css={body} />
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  divided: PropTypes.bool,
  name: PropTypes.string
};

function App() {
  return (
    <>
      <Global
        styles={css`
          body {
            padding: 2rem;
          }
        `}
      />
      <div className="App">
        <Section name={'Tacos'} />
        <Section name={'Burritos'} fullWidth />
      </div>
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
