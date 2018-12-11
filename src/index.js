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
    rows: 4,
    rowGap: '1.25rem'
  },
  tablet: {
    columns: 8,
    columnGap: '1.875rem',
    rows: 3,
    rowGap: '1.875rem'
  },
  desktop: {
    columns: 12,
    columnGap: '2.5rem',
    rows: 3,
    rowGap: '2.5rem'
  }
};

/**
 * @function repeat - repeats an expression, handles ie syntax
 * @param { number } repetitions
 * @param { string } expression - expression to repeat (fr, px, rem etc)
 * @param { bool } ie - internet explorer 10 & 11
 * @returns { string } - expression repeated
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
 * @function grid - creates grid display rules per the defined spec
 * @param { string } breakpoint - mobile, tablet, desktop
 * @param { object } spec - grid definitions
 * @returns { string } - grid display rules
 */
const grid = (breakpoint = 'mobile', spec = gridSpec) => {
  const { mobile, tablet, desktop } = spec;
  const getBreakpoint = breakpoint => {
    switch (breakpoint) {
      case 'mobile':
        return `
          -ms-grid-columns:
           ${mobile.columnGap} ${repeat(mobile.columns, `1fr ${mobile.columnGap}`, true)};
          -ms-grid-rows: ${repeat(mobile.rows, `1fr ${mobile.rowGap}`, true)};
          grid-template-columns: 1px ${repeat(mobile.columns, '1fr')} 1px;
          grid-template-rows: ${repeat(mobile.rows, '1fr')};
          grid-column-gap: ${mobile.columnGap};
          grid-row-gap: ${mobile.rowGap};
        `;
      case 'tablet':
        return `
          -ms-grid-columns:
          ${tablet.columnGap} ${repeat(tablet.columns, `1fr ${tablet.columnGap}`, true)};
          -ms-grid-rows: ${repeat(tablet.rows, `1fr ${tablet.rowGap}`, true)};
          grid-template-columns: 1px ${repeat(tablet.columns, '1fr')} 1px;
          grid-template-rows: ${repeat(tablet.rows, '1fr')};
          grid-column-gap: ${tablet.columnGap};
          grid-row-gap: ${tablet.rowGap};
        `;
      case 'desktop':
        return `
          -ms-grid-columns:
          ${desktop.columnGap} ${repeat(
          desktop.columns,
          `1fr ${desktop.columnGap}`,
          true
        )};
          -ms-grid-rows: ${repeat(desktop.rows, `1fr ${desktop.rowGap}`, true)};
          grid-template-columns: 1px ${repeat(desktop.columns, '1fr')} 1px;
          grid-template-rows: ${repeat(desktop.rows, '1fr')};
          grid-column-gap: ${desktop.columnGap};
          grid-row-gap: ${desktop.rowGap};
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

/**
 * @function gridColumn - places a grid item on a column
 * @param { number } start - grid line column starts at
 * @param { number } end - grid line column ends at
 * @param { bool } span - false to use grid line end rather than span
 * @returns { string } - grid-column values
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
 * @param { number } start - grid line row starts at
 * @param { number } end - grid line row ends at
 * @param { bool } span - false to use grid line end rather than span
 * @returns { string } - grid-row values
 */
const gridRow = (start, end, span = true) => {
  return `
    -ms-grid-row: ${start};
    -ms-grid-row-span: ${end};
    grid-row: ${start}/ ${span ? `span ${end}` : end};
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

const Section = props => {
  const { name } = props;
  const section = css`
    ${gridColumn(2, 6)};
    ${gridRow(2, 1)};
    margin: 0 0 1rem;
    background-color: orange;

    &:last-of-type {
      ${gridRow(3, 1)};
    }

    @media (min-width: 600px) {
      ${gridColumn(2, 4)};

      &:last-of-type {
        ${gridColumn(6, 4)};
        ${gridRow(2, 1)};
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

const Footer = props => {
  const footer = css`
    ${gridColumn(1, -1, false)};
    ${gridRow(4, 1)};
    background-color: gold;
    @media (min-width: 600px) {
      ${gridRow(3, 1)};
    }
  `;
  return (
    <footer css={footer} {...props}>
      {props.copy}
    </footer>
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
