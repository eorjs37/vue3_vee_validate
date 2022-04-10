import { configure, defineRule} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';
import ko from '@vee-validate/i18n/dist/locale/ko.json';

// Install all rules
Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
});


configure({
  generateMessage: localize({
    en: {
      names: {
        name:'Name',
        age: 'Age',
      },
      messages: en.messages,
    },
    ko: {
      names:{
        name:'이름',
        age: '나이',
      },
      messages: ko.messages,
    },
  })
});