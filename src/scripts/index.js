import '../styles/normalize.scss';
import '../styles/style.scss';
import PinyinConverter from './PinyinConverter';

const log = console.log.bind(console);


function genRadioGroup(data) {
  const { fieldName, parent, title, options } = data;
  const optionsStr = options.map((o) => {
    const { name, value, checked } = o;
    return `
        <div>
          <input 
            type="radio" id="${value}" name="${fieldName}" value="${value}"  
            ${checked ? 'checked' : ''} />
          <label for="${value}">${name}</label>
        </div>`;
  }).join('');
  parent.innerHTML = `<label>${title}</label>${optionsStr}`;
}

function initForm() {
  const modeSelector = document.querySelector('.mode-selector');
  genRadioGroup({
    fieldName: 'mode',
    parent: modeSelector,
    title: '选择模式:以"刘德华"为例',
    options: [
      { name: 'liu dehua', value: 'liu dehua', checked: true },
      { name: 'liu de hua', value: 'liu de hua' },
      { name: 'dehua liu', value: 'dehua liu' },
      { name: 'de hua liu', value: 'de hua liu' },
      { name: 'dhliu', value: 'dhliu' },
      { name: 'liudh', value: 'liudh' },
      { name: 'ldh', value: 'ldh' },
      { name: 'dhl', value: 'dhl' },
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
  // let html = '<label>选择模式:以"刘德华"为例</label>';
  // const modes = [
  //   'liu de hua',
  //   'liu dehua',
  //   'dehua liu',
  //   'de hua liu',
  //   'dhliu',
  //   'liudh',
  //   'ldh',
  //   'dhl',
  // ];
  // const modeStr = modes.map(m => `
  //       <div>
  //         <input type="radio" id="${m}" name="drone" value="${m}" />
  //         <label for="${m}">${m}</label>
  //       </div>`).join(' ');
  // html += modeStr;
  // modeSelector.innerHTML = html;

  // let modeSelector = document.querySelector('.mode-selector')
}

function main() {
  log('ready');
  initForm();
}
main();
