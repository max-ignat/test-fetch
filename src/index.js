import axios from "axios";
axios.defaults.baseURL = 'https://hn.algolia.com/api/v1/search';
const getItemtemplate = ({ objectID, title, story_title, url }) => {
  return `<li class="news-item" data-id=${objectID}>
    <a href=${url} target="_blank" rel="nofollow noopener">${
    title || story_title
  }</a>
  </li>`;
};

 

const refs = {
  form: document.querySelector('.news-form'),
  list: document.querySelector('.news-list'),
  submitButton: document.querySelector('.news-submit'),
  loader: document.querySelector('.news-loader'),
};

let items = [];

const render = () => {
  const list = items.map(getItemtemplate);

  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', list.join(''));
};

const showLoader = () => {
  refs.loader.classList.add('show');
};

const hideLoader = () => {
  refs.loader.classList.remove('show');
};

const lockForm = () => {
  refs.submitButton.setAttribute('disabled', true);
};

const unlockForm = () => {
  refs.submitButton.removeAttribute('disabled');
};

const handleSubmit = async (e) => {
  // const value = e.target.elements.query.value;
  const { value } = e.target.elements.query;

  e.preventDefault();

  showLoader();
    lockForm();

try {
     await axios
      .get(`?query=${value}`)
      .then(({data}) => data)
      .then(({ hits }) => {
        items = hits;
        render();
      })
      .finally(() => {
        hideLoader();
        unlockForm();
      });
} catch (error) {
    
}


    
        
//   fetch(`${URL}?query=${value}`)
    
};

refs.form.addEventListener('submit', handleSubmit);
