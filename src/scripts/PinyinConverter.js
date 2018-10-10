
// const pinyinlite = require('pinyinlite');
// const pinyin = require('pinyin');
import pinyin from 'pinyin';

const log = console.log.bind(console);
function capitalize(str) {
  const clone = str;
  return clone.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  // return clone.replace(/\b\w/g, c => c.toUpperCase());
}

class PininConverter {
  constructor(text, separator = ' ') {
    this.text = text;
    this.words = [];
    this.separator = separator;
  }

  split() {
    if (this.text) {
      this.words = this.text.replace(/^\s+|\s+$/g, '').split(/[,\s]+/);
      return this.words;
    }
    return false;
  }


  formatLetterCase(str, letter = 'capital') {
    let result = str;
    // if (letter === 'capital') {
    //   result = str.split(this.separator)
    //     .map(word => this.capitalize(word))
    //     .join(this.separator)
    // } else
    if (letter === 'upper') {
      result = str.toUpperCase();
    } else if (letter === 'lower') {
      result = str.toLowerCase();
    } else {
      result = str.split(this.separator)
        .map(word => capitalize(word))
        .join(this.separator);
    }
    return result;
  }

  convertWord(word, mode = 'liu dehua', letter = 'capital') {
    let result = '';
    // let charArr = pinyinlite(word).map(arr => arr[0])
    const charArr = pinyin(word, {
      style: pinyin.STYLE_NORMAL,
    }).map(item => item[0]);
    // log('charArr', JSON.stringify(charArr, null, 2))
    const family = charArr.shift();
    const rest = charArr;
    mode = mode.toLowerCase();
    if (mode === 'liu de hua') {
      result = [family, ...rest].join(this.separator);
    } else if (mode === 'liu dehua') {
      const name = rest.join('');
      result = `${family}${this.separator}${name}`;
    } else if (mode === 'dehua liu') {
      const name = rest.join('');
      result = `${name}${this.separator}${family}`;
    } else if (mode === 'de hua liu') {
      const name = rest.join(this.separator);
      result = `${name}${this.separator}${family}`;
    } else if (mode === 'dhliu') {
      const name = rest.map(w => w.charAt(0)).join('');
      result = name + family;
    } else if (mode === 'liudh') {
      const name = rest.map(w => w.charAt(0)).join('');
      result = family + name;
    } else if (mode === 'ldh') {
      const name = rest.map(w => w.charAt(0)).join('');
      result = family.charAt(0) + name;
    } else if (mode === 'dhl') {
      const name = rest.map(w => w.charAt(0)).join('');
      result = name + family.charAt(0);
    }

    return this.formatLetterCase(result, letter);
  }

  getAll(mode, letter) {
    this.split();
    const names = this.words.map(word => this.convertWord(word, mode, letter));
    // log(names)
    return names;
  }
  // mode
  // 0 liu de hua
  // 1 liu dehua
  // 2 dehua liu
  // 3 de hua liu
  // 4 dhliu
  // 5 liudh
  // 7 ldh
  // 8 dhl

  // 大小写
  // upper
  // lower
  // Capital

  go(mode = 'liu dehua', letter = 'capital') {
    // log('inside', { mode, letter });
    return this.getAll(mode, letter);
  }
}

export default PininConverter;
// module.exports = PininConverter;
