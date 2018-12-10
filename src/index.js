/**@jsx jsx */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Global, css, jsx } from '@emotion/core';

/**
 * @function repeat - repeat unit value anywhere in code, handle ie
 * @param { number } repetitions
 * @param { string } unit - unit to repeat (fr, px, rem etc)
 * @param { bool } ie - internet explorer 10 & 11
 * @returns { string } - unit repeated
 * @example
 * repeat(4, '3fr', true);
 * // returns (3fr)[4]
 * @example
 * repeat(4, '3fr');
 * // returns 3fr 3fr 3fr 3fr
 */
const repeat = (repetitions, unit = '1fr', ie = false) => {
  let str;
  ie
    ? (str = `(${unit})[${repetitions}]`)
    : (str = unit + ' ');
  return ie ? str : str.repeat(repetitions);
};

/**
 * @function gridColumn - uses `span` by default pass false to specify grid line end
 * @param {}
 */
const gridColumn = (start, end, span = true) => {
  return `
    grid-column: ${start}/ ${span ? `span ${end}` : end};
  `;
};

const gridSpec = {
  mobile: {
    columns: 6,
    columnGap: '1.25rem',
    rows: 'auto',
    rowGap: '1.25rem'
  },
  // mobile: {
  //   gridTemplateColumns: `1px repeat(6, 1fr) 1px`,
  //   gridColumnGap: '1.25rem',
  //   gridTemplateRows: 'auto'
  // },
  tablet: {
    columns: 8,
    columnGap: '1.875rem',
    rows: 'auto',
    rowGap: '1.875rem'
  },
  desktop: {
    columns: 12,
    columnGap: '2.5rem',
    rows: 'auto',
    rowGap: '2.5rem'
  }
};

/**
 * @function grid
 * @param {object} gridSpec - grid definitions
 * @param {string} breakpoint - mobile, tablet, desktop
 */
const grid = (gridSpec, breakpoint = 'mobile') => {
  const { mobile, tablet, desktop } = gridSpec;
  const getBreakpoint = breakpoint => {
    switch (breakpoint) {
      case 'mobile':
        return `
          -ms-grid-columns: 10px ${repeat(
            6,
            '1fr',
            true
          )} 10px;
          grid-template-columns: 1px ${repeat(
            6,
            '1fr'
          )} 1px;
          grid-column-gap: ${mobile.columnGap};
        `;
      case 'tablet':
        return `
          -ms-grid-columns: 30px ${repeat(
            8,
            '1fr',
            true
          )} 30px;
          grid-template-columns: 1px ${repeat(
            8,
            '1fr'
          )} 1px;
          grid-column-gap: ${tablet.columnGap};
        `;
      case 'desktop':
        return `
          -ms-grid-columns: 30px ${repeat(
            12,
            '1fr',
            true
          )} 30px;
          grid-template-columns: 1px ${repeat(
            12,
            '1fr'
          )} 1px;
          grid-column-gap: ${tablet.columnGap};
        `;
      default:
        return '';
    }
  };

  return `
    display: -ms-grid;
    display: grid;
    ${getBreakpoint(breakpoint)};
  `;
};

export const Section = props => {
  const section = css`
    ${grid(gridSpec)};
    margin: 0 0 2rem;
    padding: ${props.fullWidth ? 0 : '2rem'};
    background-color: gold;

    @media (min-width: 600px) {
      ${grid(gridSpec, 'tablet')};
    }

    @media (min-width: 800px) {
      ${grid(gridSpec, 'desktop')};
    }
  `;
  const header = css`
    ${gridColumn(1, 5)};
    ${gridColumn(1, -1, false)};
    background-color: darkkhaki;
    text-align: center;
    font-family: 'helvetica neue', helvetica, sans-serif;
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
