import profanityFilter from 'leo-profanity';

profanityFilter.add(profanityFilter.getDictionary('fr'));
profanityFilter.add(profanityFilter.getDictionary('ru'));

const filterProfanity = (str) => profanityFilter.clean(str, '*');

export { filterProfanity };
