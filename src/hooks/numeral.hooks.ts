import { useState, useEffect } from 'react';
import numeral from 'numeral';

function useSetCustomLocale(name: string) {

  useEffect(() => {
    if (numeral.locales[name] === undefined) {
      numeral.register('locale', name, {
        delimiters: {
          thousands: ' ',
          decimal: '.'
        },
        abbreviations: {
          thousand: 'k',
          million: 'm',
          billion: 'b',
          trillion: 't'
        },
        ordinal : function (number) {
          return number === 1 ? 'er' : 'ème';
      },
        currency: {
          symbol: '$'
        }
      });
            
      numeral.locale(name);
      numeral.defaultFormat('0[,]0[.]00 $');
    }
    
    return () => {      
      numeral.reset();
    }
    
  }, [])
}

const numeralHooks = {
  useSetCustomLocale
}

export default numeralHooks;

