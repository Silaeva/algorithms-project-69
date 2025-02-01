const cleanText = (text) => text
  .replace(/[.,!?;:()"-]/g, ' ')
  .toLowerCase()
  .replace(/\s+/g, ' ')
  .trim();

const buildIndex = (docsArray) => {
  const index = {};
  const docFrequencies = {};

  docsArray.forEach(({ id, text }) => {
    const words = new Set(cleanText(text).split(/\s+/));
    words.forEach((word) => {
      if (!index[word]) {
        index[word] = [];
        docFrequencies[word] = 0;
      }
      index[word].push(id);
      docFrequencies[word] += 1;
    });
  });

  return { index, docFrequencies, totalDocs: docsArray.length };
};

const computeTFIDF = (word, docWords, docFrequencies, totalDocs) => {
  const tf = docWords.filter((w) => w === word).length / docWords.length;
  const idf = Math.log((totalDocs + 1) / (docFrequencies[word] + 1)) + 1;
  return tf * idf;
};

const search = (docsArray, searchString) => {
  if (!searchString.trim() || !Array.isArray(docsArray)) return [];

  const { index, docFrequencies, totalDocs } = buildIndex(docsArray);
  const searchWords = new Set(cleanText(searchString).split(/\s+/));
  const relevanceMap = {};

  docsArray.forEach(({ id, text }) => {
    const docWords = cleanText(text).split(/\s+/);
    let score = 0;

    searchWords.forEach((word) => {
      if (index[word]?.includes(id)) {
        score += computeTFIDF(word, docWords, docFrequencies, totalDocs);
      }
    });

    if (score > 0) {
      relevanceMap[id] = score;
    }
  });

  return Object.entries(relevanceMap)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
};

export default search;
