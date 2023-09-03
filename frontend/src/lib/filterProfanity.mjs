/* eslint-disable import/prefer-default-export */
import profanityFilter from 'leo-profanity';

profanityFilter.add(profanityFilter.getDictionary('fr'));
profanityFilter.add(profanityFilter.getDictionary('ru'));

const filterProfanity = {
  clean: (str) => profanityFilter.clean(str, '*'),
};

export { filterProfanity };