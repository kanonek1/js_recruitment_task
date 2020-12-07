import { element, handleEventsData } from '../../utils';
class Pagination {
  constructor(data, element) {
    this.data = data;
    this.element = element;

    this._handleChange();
  }

  // Getters

  get activePageSelect() {
    return document.querySelector('#activePageSelect');
  }

  // Public

  create() {
    const { currentPage, pages } = this.data;

    this.activePageSelect.innerHTML = '';

    for (let index = 1; index <= pages; index++) {
      const option = element('option');

      option.innerText = index;
      option.selected = currentPage === index ? true : false;
      option.value = index;

      this.activePageSelect.insertAdjacentElement('beforeend', option);
    }
  }

  // Private

  _handleChange() {
    this.activePageSelect.addEventListener('change', (event) => handleEventsData(event, this.element, 'currentPage'));
  }
}

export default Pagination;
