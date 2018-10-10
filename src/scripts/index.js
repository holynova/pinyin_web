import '../styles/normalize.scss';
import '../styles/style.scss';
import PinyinConverter from './PinyinConverter';
import $ from 'jquery';

const log = console.log.bind(console);


function genRadioGroup(data) {
  const { fieldName, parent, title, options } = data;
  const optionsStr = options.map((o) => {
    const { name, value, checked } = o;
    return `
        <div class='option' >
          <input 
            type="radio" id="${value}" name="${fieldName}" value="${value}"  
            ${checked ? 'checked' : ''} />
          <label for="${value}">${name}</label>
        </div>`;
  }).join('');
  parent.innerHTML = `<label class='group-title' >${title}</label>${optionsStr}`;
}

function initForm() {
  const modeSelector = document.querySelector('.mode-selector');
  genRadioGroup({
    fieldName: 'mode',
    parent: modeSelector,
    title: '选择模式:以"刘德华"为例',
    options: [
      { name: 'Liu Dehua', value: 'liu dehua', checked: true },
      { name: 'Liu De Hua', value: 'liu de hua' },
      { name: 'Dehua Liu', value: 'dehua liu' },
      { name: 'De Hua Liu', value: 'de hua liu' },
      { name: 'Dhliu', value: 'dhliu' },
      { name: 'Liudh', value: 'liudh' },
      { name: 'Ldh', value: 'ldh' },
      { name: 'Dhl', value: 'dhl' },
    ],
  });

  genRadioGroup({
    fieldName: 'letterMode',
    parent: document.querySelector('.letter-mode-selector'),
    title: '选择大小写',
    options: [
      { name: '首字母大写', value: 'capital', checked: true },
      { name: '全大写', value: 'upper' },
      { name: '全小写', value: 'lower' },
    ],
  });
}

function capitalize(str) {
  const clone = str;
  return clone.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}


function convert() {
  const mode = $('.mode-selector input:checked').val();
  const letterMode = $('.letter-mode-selector input:checked').val();
  const input = $('#input').val();
  // log({ mode, letterMode, input });
  const p = new PinyinConverter(input);
  const results = p.go(mode, letterMode);
  // log(results);
  $('#output').val(results.join('\n'));
}

function initBtn() {
  $('.btn-go').click(convert);
  $('.mode-selector').change(convert);
  $('.letter-mode-selector').change(() => {
    // 将选项的字母也改成大小写格式
    const letterMode = $('.letter-mode-selector input:checked').val();
    if (letterMode === 'lower') {
      $('.mode-selector label').each(function () {
        $(this).text($(this).text().toLowerCase());
      });
    } else if (letterMode === 'upper') {
      $('.mode-selector label').each(function () {
        $(this).text($(this).text().toUpperCase());
      });
    } else {
      $('.mode-selector label').each(function () {
        const text = $(this).text();
        // log(capitalize(text));
        $(this).text(capitalize(text));
      });
    }
    convert();
  });
  $('#input').blur(convert);
}

function main() {
  log('ready');
  initForm();
  initBtn();
}


$(document).ready(main);
// main();
