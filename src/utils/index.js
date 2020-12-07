const splitByT = (el) => el.split('T')[0];

const getLastDate = () => {
  const date = new Date().setDate(new Date().getDate() - 30);
  return splitByT(new Date(date).toISOString());
};

const handleEventsData = (event, element, type) => {
  let { data } = element;

  if (event !== undefined) {
    const { value } = event.target;

    if (data[type] === value) return;

    data[type] = value;
    if (type !== 'currentPage') data.currentPage = 1;
    element.handleDataAPI();
  }
};

const element = (element) => document.createElement(element);

export { getLastDate, splitByT, handleEventsData, element };
