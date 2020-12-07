import { element } from '../../utils';
import { getReadtLaterTemplate } from '../../utils/templates';

class ReadLater {
  constructor(data, element) {
    this.data = data;
    this.element = element;
  }

  // Public

  create() {
    const li = element('li');

    li.innerHTML = getReadtLaterTemplate(this.data);

    const btn = li.querySelector('button');

    btn.addEventListener('click', (e) => this._handleRemoveBtn(e));

    return li;
  }

  // Private

  _handleRemoveBtn({ target: { id: targetId } }) {
    const saveResult = JSON.parse(localStorage.getItem('localResults'));
    const filteredItem = saveResult.filter(({ id }) => id !== targetId);

    localStorage.setItem('localResults', JSON.stringify([...filteredItem]));

    this.element.handleReadLaterList();
    this.element.handleOnLoadAndRefresh();
  }
}

export default ReadLater;
