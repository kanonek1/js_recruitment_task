import { getReadtLaterTemplate } from '../../utils/templates';

class ReadLater {
  constructor(data, element) {
    this.data = data;
    this.element = element;
  }

  // Public

  create() {
    const li = document.createElement('li');

    li.innerHTML = getReadtLaterTemplate(this.data);

    const btn = li.querySelector('button');

    btn.addEventListener('click', ({ target: { id: targetId } }) => {
      const saveResult = JSON.parse(localStorage.getItem('savedResults'));
      const filteredItem = saveResult.filter(({ id }) => id !== targetId);

      localStorage.setItem('savedResults', JSON.stringify([...filteredItem]));

      this.element.handleReadLaterList();
      this.element.handleOnLoadAndRefresh();
    });

    return li;
  }
}

export default ReadLater;
