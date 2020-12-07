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
    return JSON.parse(localStorage.getItem('localResults'));
  }

  get pagination() {
    return new Pagination(this.data, this).create();
  }

  get contentSearch() {
    return new ContentSearch(this);
  }

  get section() {
    return new Section(this);
  }

  // Public

  handleDataAPI() {
    const { currentPage, section, searchTerm } = this.data;
    const searchTermParam = searchTerm ? `&q=${searchTerm}` : '';
    const sectionParam = section === 'all' || section === '' ? '' : `&section=${section}`;

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
        this.pagination;
        this.contentSearch;
        this.section;
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

    const localResults = JSON.parse(localStorage.getItem('localResults'));

    [...localResults].forEach(({ title, link, id }) => {
      const readLaterItem = this._getReadLater({
        title,
        link,
        id,
      });

      return this.readLaterList.insertAdjacentElement('beforeend', readLaterItem);
    });
  }

  // Private

  _getArticle(data) {
    return new Article(data, this).create();
  }

  _getReadLater(data) {
    return new ReadLater(data, this).create();
  }

  _handleList() {
    this.newsList.innerHTML = '';

    [...this.data.results].forEach(({ id, sectionName, webPublicationDate, webTitle: title, webUrl: link }) => {
      const articles = this._getArticle({
        date: splitByT(webPublicationDate).split('-').reverse().join('.'),
        id,
        link,
        sectionName,
        title,
      });

      this.newsList.appendChild(articles);
    });
  }

  _handleListLength() {
    if (this.newListItems.length === 0) {
      this.newsList.innerHTML = 'No data found in the search parameters';
    }
  }
}

export default ListApp;
