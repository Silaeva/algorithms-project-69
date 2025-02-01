import search from './index';

describe('search function', () => {
  const documents = [
    { id: 1, text: 'Hello world' },
    { id: 2, text: 'Jest is great' },
    { id: 3, text: 'Unit tests are important' },
    { id: 4, text: 'Hello again' },
  ];

  test('finds documents containing the search string', () => {
    expect(search(documents, 'hello')).toEqual([1, 4]);
  });

  test('returns an empty array if no matches are found', () => {
    expect(search(documents, 'notfound')).toEqual([]);
  });

  test('is case insensitive', () => {
    expect(search(documents, 'JEST')).toEqual([2]);
  });

  test('matches substrings within words', () => {
    expect(search(documents, 'test')).toEqual([3]);
  });

  test('returns all matching documents', () => {
    expect(search(documents, 're')).toEqual([2, 3]);
  });

  test('returns an empty array if search string is empty', () => {
    expect(search(documents, '')).toEqual([]);
  });
});