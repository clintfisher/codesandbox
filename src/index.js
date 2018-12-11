/**@jsx jsx */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Global, css, jsx } from '@emotion/core';

/**
 * @object gridSpec - define our grid
 * mobile
 * tablet
 * desktop
 */
const gridSpec = {
  mobile: {
    columns: 6,
    columnGap: '1.25rem',
    rows: '3',
    rowGap: '1.25rem'
  },
  tablet: {
    columns: 8,
    columnGap: '1.875rem',
    rows: '3',
    rowGap: '1.875rem'
  },
  desktop: {
    columns: 12,
    columnGap: '2.5rem',
    rows: '3',
    rowGap: '2.5rem'
  }
};

/**
 * @function repeat - repeata a unit value anywhere in code, handle ie syntax
 * @param { number } repetitions
 * @param { string } expression - expression to repeat (fr, px, rem etc)
 * @param { bool } ie - internet explorer 10 & 11
 * @returns { string } - unit repeated
 * @example
 * repeat(4, '3fr', true);
 * // returns (3fr)[4]
 * @example
 * repeat(4, '3fr');
 * // returns 3fr 3fr 3fr 3fr
 */
const repeat = (repetitions, expression = '1fr', ie = false) => {
  let string;
  ie ? (string = `(${expression})[${repetitions}]`) : (string = expression + ' ');
  return ie ? string : string.repeat(repetitions);
};

/**
 * @function gridColumn - places a grid item on a column
 * @param {number} start - grid line column starts at
 * @param {number} end - grid line column ends at
 * @param {bool} span - false to use grid line end rather than span
 * @example
 * ${gridColumn(2, 6)};
 * // grid-column-start: 2;
 * // grid-column-end: span 6;
 * @example
 * ${gridColumn(1, -1, false)};
 * // grid-column-start: 1;
 * // grid-column-end: -1;
 */
const gridColumn = (start, end, span = true) => {
  return `
    -ms-grid-column: ${start};
    -ms-grid-column-span: ${end};
    grid-column: ${start}/ ${span ? `span ${end}` : end};
  `;
};

/**
 * @function gridRow - places a grid item on a row
 * @param {number} start - grid line row starts at
 * @param {number} end - grid line row ends at
 * @param {bool} span - false to use grid line end rather than span
 */
const gridRow = (start, end, span = true) => {
  return `
    -ms-grid-row: ${start};
    -ms-grid-row-span: ${end};
    grid-row: ${start}/ ${span ? `span ${end}` : end};
  `;
};

/**
 * @function grid - outputs grid definitions according to the defined spec
 * @param {string} breakpoint - mobile, tablet, desktop
 * @param {object} spec - grid definitions
 */
const grid = (breakpoint = 'mobile', spec = gridSpec) => {
  const { mobile, tablet, desktop } = spec;
  const getBreakpoint = breakpoint => {
    switch (breakpoint) {
      case 'mobile':
        return `
          -ms-grid-columns:
           ${mobile.columnGap} ${repeat(6, `1fr ${mobile.columnGap}`, true)};
          -ms-grid-rows: ${mobile.rows};
          grid-template-columns: 1px ${repeat(6, '1fr')} 1px;
          grid-column-gap: ${mobile.columnGap};
        `;
      case 'tablet':
        return `
          -ms-grid-columns:
          ${tablet.columnGap} ${repeat(8, `1fr ${tablet.columnGap}`, true)};
          -ms-grid-rows: ${tablet.rows};
          grid-template-columns: 1px ${repeat(8, '1fr')} 1px;
          grid-column-gap: ${tablet.columnGap};
        `;
      case 'desktop':
        return `
          -ms-grid-columns:
          ${desktop.columnGap} ${repeat(12, `1fr ${desktop.columnGap}`, true)};
          -ms-grid-rows: ${desktop.rows};
          grid-template-columns: 1px ${repeat(12, '1fr')} 1px;
          grid-column-gap: ${desktop.columnGap};
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

const Page = props => {
  const page = css`
    ${grid('mobile')};
    min-height: 150px;
    background-color: darkkhaki;
    margin: 0 0 2rem;

    @media (min-width: 600px) {
      ${grid('tablet')};
    }

    @media (min-width: 800px) {
      ${grid('desktop')};
    }
  `;
  return <div css={page} {...props} />;
};

const Header = props => {
  const header = css`
    ${gridRow(1, 1)};
    ${gridColumn(1, -1, false)};
    text-align: center;
    background-color: gold;
  `;
  return (
    <header css={header} {...props}>
      <h1>{props.heading}</h1>
    </header>
  );
};

const Footer = props => {
  const footer = css`
    ${gridColumn(1, -1, false)};
    ${gridRow(3, 1)};
    background-color: gold;
  `;
  return (
    <footer css={footer} {...props}>
      {props.copy}
    </footer>
  );
};

const Section = props => {
  const { name } = props;
  const section = css`
    ${gridColumn(2, 6)};
    ${gridRow(2, 1)};
    margin: 0 0 1rem;
    background-color: orange;

    @media (min-width: 600px) {
      ${gridColumn(2, 4)};

      &:last-of-type {
        ${gridColumn(6, 4)};
      }
    }

    @media (min-width: 800px) {
      ${gridColumn(2, 6)};

      &:last-of-type {
        ${gridColumn(8, 6)};
      }
    }
  `;
  return (
    <section css={section} {...props}>
      <h1>{name}</h1>
    </section>
  );
};

const App = () => {
  return (
    <>
      <Global
        styles={css`
          body {
            padding: 2rem;
            font-family: 'helvetica neue', helvetica, sans-serif;
          }
        `}
      />
      <Page>
        <Header heading={'Los Angeles Times'} />
        <Section name={'Email'} />
        <Section name={'Password'} />
        <Footer copy={'© 2018'} />
      </Page>
    </>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
