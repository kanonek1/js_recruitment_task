const getListItemTemplate = ({ title, sectionName, date, link, id }) =>
  `<article class="news">
  <header>
    <h3>${title}</h3>
  </header>
  <section class="newsDetails">
    <ul>
      <li><strong>Section Name:</strong> ${sectionName}</li>
      <li><strong>Publication Date:</strong> ${date}</li>
    </ul>
  </section>
  <section class="newsActions">
    <a href="${link}" target="_blank" class="button">Full article</a>
    <button class="button button-outline" id='${id}'>Read Later</button>
  </section>
</article>`;

const getReadtLaterTemplate = ({ title, link, id }) =>
  `<h4 class="readLaterItem-title">${title}</h4>
  <section>
    <a href="${link}" class="button button-clear">Read</a>
    <button class="button button-clear" id='${id}'>Remove</button>
  </section>`;

export { getListItemTemplate, getReadtLaterTemplate };
