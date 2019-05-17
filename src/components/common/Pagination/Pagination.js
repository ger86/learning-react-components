import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Pagination extends PureComponent {
  static propTypes = {
    totalItems: PropTypes.number.isRequired,
    generateLinkForPage: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
    initialPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  static defaultProps = {
    initialPage: 1,
    pageSize: 10
  };

  state = { pager: {} };

  componentWillMount() {
    const { totalItems, initialPage } = this.props;
    // set page if items array isn't empty
    if (totalItems > 0) {
      this.setPage(initialPage);
    }
  }

  setPage(page) {
    const { pager } = this.state;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    const newPager = this.getPager(page);

    // update state
    this.setState({ pager: newPager });
  }

  getPager(currentPage = 1) {
    const { totalItems, pageSize } = this.props;

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage;
    let endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  render() {
    const { pager } = this.state;
    const { generateLinkForPage } = this.props;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <ul className="pagination">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <Link to={generateLinkForPage(1)}>Primera</Link>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <Link to={generateLinkForPage(pager.currentPage - 1)}>Anterior</Link>
        </li>
        {pager.pages.map(page => (
          <li
            key={`page-${page}`}
            className={pager.currentPage === page ? 'active' : ''}
          >
            <Link to={generateLinkForPage(page)}>{page}</Link>
          </li>
        ))}
        <li
          className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
        >
          <Link to={generateLinkForPage(pager.currentPage + 1)}>Anterior</Link>
        </li>
        <li
          className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
        >
          <Link to={generateLinkForPage(pager.totalPages)}>Última</Link>
        </li>
      </ul>
    );
  }
}
