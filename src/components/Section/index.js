import { handleEventsData } from '../../utils';

class Section {
  constructor(element) {
    this.element = element;

    this.bindedEventChange = this._handleChange.bind(this);
    this.sectionSelect.addEventListener('change', this.bindedEventChange);
  }

  // Getters

  get sectionSelect() {
    return document.querySelector('#sectionSelect');
  }

  // Private

  _handleChange(event) {
    handleEventsData(event, this.element, 'section');
  }
}

export default Section;
