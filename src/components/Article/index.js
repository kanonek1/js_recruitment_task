import { getListItemTemplate } from '../../utils/templates';
import { element } from '../../utils';
class Article {
  constructor(data, element) {
    this.data = data;
    this.element = element;
  }

  // Getters

  get readLaterList() {
    return document.querySelector('.readLaterList');
  }

  get localStorageItemSaved() {
    return JSON.parse(localStorage.getItem('localResults'));
  }

  // Public

  create() {
    const listItem = element('li');

    listItem.innerHTML = getListItemTemplate(this.data);

    const btn = listItem.querySelector('button');

    btn.addEventListener('click', () => this._saveResult(this.data));

    return listItem;
  }

  // Private

  _saveResult(result) {
    const saveResult = this.localStorageItemSaved === null ? [] : this.localStorageItemSaved;

    if (!saveResult.find(({ id }) => id === result.id)) {
      localStorage.setItem('localResults', JSON.stringify([...saveResult, result]));

      this.element.handleReadLaterList();
    }
  }
}

export default Article;
