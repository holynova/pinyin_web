// const chai = require('chai');
import chai from 'chai'; // Using Should style
import PinyinConverter from '../scripts/PinyinConverter';

const should = chai.should();

describe('类测试', () => {
  it('大小写测试', () => {
    const p = new PinyinConverter();
    const str = 'liu dehua';
    p.formatLetterCase(str).should.be.equal('Liu Dehua');
    p.formatLetterCase(str, 'foo').should.be.equal('Liu Dehua');
    p.formatLetterCase(str, 'capital').should.be.equal('Liu Dehua');
    p.formatLetterCase(str, 'lower').should.be.equal('liu dehua');
    p.formatLetterCase(str, 'upper').should.be.equal('LIU DEHUA');
  });


  it('人名测试,以刘德华为例', () => {
    const p = new PinyinConverter('刘德华');
    const modes = [
      'liu de hua',
      'liu dehua',
      'dehua liu',
      'de hua liu',
      'dhliu',
      'liudh',
      'ldh',
      'dhl',
    ];
    for (const mode of modes) {
      p.go(mode, 'lower')[0].should.equal(mode);
    }
  });

  it('人名+大小写完整测试', () => {
    const name = '吕洞宾';
    const testCases = [
      { mode: 'liu de hua', letter: 'lower', expect: 'lv dong bin' },
      { mode: 'liu dehua', letter: 'lower', expect: 'lv dongbin' },
      { mode: 'dehua liu', letter: 'lower', expect: 'dongbin lv' },
      { mode: 'de hua liu', letter: 'lower', expect: 'dong bin lv' },
      { mode: 'dhliu', letter: 'lower', expect: 'dblv' },
      { mode: 'liudh', letter: 'lower', expect: 'lvdb' },
      { mode: 'ldh', letter: 'lower', expect: 'ldb' },
      { mode: 'dhl', letter: 'lower', expect: 'dbl' },

      { mode: 'liu de hua', letter: 'upper', expect: 'LV DONG BIN' },
      { mode: 'liu dehua', letter: 'upper', expect: 'LV DONGBIN' },
      { mode: 'dehua liu', letter: 'upper', expect: 'DONGBIN LV' },
      { mode: 'de hua liu', letter: 'upper', expect: 'DONG BIN LV' },
      { mode: 'dhliu', letter: 'upper', expect: 'DBLV' },
      { mode: 'liudh', letter: 'upper', expect: 'LVDB' },
      { mode: 'ldh', letter: 'upper', expect: 'LDB' },
      { mode: 'dhl', letter: 'upper', expect: 'DBL' },
    ];

    const p = new PinyinConverter(name);
    for (const c of testCases) {
      const { mode, letter, expect } = c;
      p.go(mode, letter)[0].should.equal(expect);
    }
  });
});
