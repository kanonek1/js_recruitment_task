import { handleEvents } from '../../utils';

class ContentSearch {
  constructor(element) {
    this.element = element;

    this.bindEventToInput = this._handleInputEvent.bind(this);
    this.newsContentSearch.addEventListener('change', this.bindEventToInput);
  }

  // Getters

  get newsContentSearch() {
    return document.querySelector('#newsContentSearch');
  }

  // Private

  _handleInputEvent(event) {
    handleEvents(event, this.element, 'searchTerm');
  }
}

export default ContentSearch;
