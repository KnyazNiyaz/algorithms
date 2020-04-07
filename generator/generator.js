import { random } from './utils.js';

function generateList(count) {
  let arr = [...new Array(count)].map(() => random(0, 100));
  return arr;
}

class Generator extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    var shadow = this.attachShadow({ mode: 'open' });

    const template = document.createElement('button');
    template.setAttribute('id', 'btn');
    template.textContent = 'Generate numbers';
    console.log('template: ', template);

    var style = document.createElement('style');

    style.textContent = `#btn { 
        border: 1px solid #de1515;
        border-radius: 5px;
        height: 2.5rem;
        font-size: 1rem;
        width: 100%;
        margin-top: 1rem;
    }`;

    template.addEventListener('click', (e) => {
      let list = generateList(random(5, 15))
      let input = document.getElementById('list-input');
      input.value = list.join(' ')
      let formBTN = document.getElementById('submit');
      formBTN.click();
    });

    shadow.appendChild(style);
    shadow.appendChild(template);
  }
}

customElements.define('generator-btn', Generator);
