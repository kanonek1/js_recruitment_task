import { getLastDate, splitByT } from '../utils';
import Article from './Article';
import ContentSearch from './ContentSearch';
import Pagination from './Pagination';
import ReadLater from './ReadLater';
import Section from './Section';

class ListApp {
  constructor({ key }) {
    this.apiKey = key;

    this.data = {
      currentPage: 1,
      pages: null,
      results: [],
      searchTerm: '',
      section: '',
    };

    this.handleOnLoadAndRefresh();
  }

  // Getters

  get newsList() {
    return document.querySelector('.newsList');
  }

  get newListItems() {
    return this.newsList.childNodes;
  }

  get readLaterList() {
    return document.querySelector('.readLaterList');
  }

  get localStorageItemSaved() {
    return JSON.parse(localStorage.getItem('savedResults'));
  }

  // Public

  handleData() {
    const { currentPage, section, searchTerm } = this.data;
    const searchTermParam = searchTerm ? `&q=${searchTerm}` : '';
    const sectionParam =
      section === 'all' || section === '' ? '' : `&section=${section}`;

    const url = `https://content.guardianapis.com/search?from-date=${getLastDate()}&page=${currentPage}${sectionParam}${searchTermParam}&api-key=${
      this.apiKey
    }`;

    fetch(url)
      .then((res) => res.json())
      .then(({ response: { currentPage, pages, results } }) => {
        this.data = {
          ...this.data,
          currentPage,
          pages,
          results,
        };
      })
      .then(() => {
        this._getPagination();
        this._getSearch();
        this._getSection();
        this._handleList();
        this._handleListLength();
      })
      .catch((err) => console.log(err));
  }

  handleOnLoadAndRefresh() {
    if (this.localStorageItemSaved) {
      if (this.localStorageItemSaved.length === 0) {
        // eslint-disable-next-line quotes
        this.readLaterList.innerHTML = "You didn't save anything yet";
      } else {
        this.handleReadLaterList();
      }
    } else {
      // eslint-disable-next-line quotes
      this.readLaterList.innerHTML = "You didn't save anything yet";
    }
  }

  handleReadLaterList() {
    this.readLaterList.innerHTML = '';

    const savedResults = JSON.parse(localStorage.getItem('savedResults'));

    [...savedResults].forEach(({ title, link, id }) => {
      const readLaterItem = new ReadLater(
        {
          title,
          link,
          id,
        },
        this
      ).create();

      return this.readLaterList.appendChild(readLaterItem);
    });
  }

  // Private

  _getPagination() {
    return new Pagination(this.data, this).create();
  }

  _getSection() {
    return new Section(this);
  }

  _getSearch() {
    return new ContentSearch(this);
  }

  _handleList() {
    this.newsList.innerHTML = '';

    [...this.data.results].forEach(
      ({
        id,
        sectionName,
        webPublicationDate,
        webTitle: title,
        webUrl: link,
      }) => {
        const articles = new Article(
          {
            date: splitByT(webPublicationDate).split('-').reverse().join('.'),
            id,
            link,
            sectionName,
            title,
          },
          this
        ).createListElement();

        this.newsList.appendChild(articles);
      }
    );
  }

  _handleListLength() {
    if (this.newListItems.length === 0) {
      this.newsList.innerHTML = 'No data found in the search parameters';
    }
  }
}

export default ListApp;
