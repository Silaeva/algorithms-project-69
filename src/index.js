const buildInvertedIndex = (docs) => {
  const index = {};
  const docWordCounts = new Map();

  docs.forEach(({ id, text }) => {
    const words = cleanText(text).split(" ");
    docWordCounts.set(id, words.length);

    words.forEach((word) => {
      if (!index[word]) {
        index[word] = { docIds: new Set(), frequencies: {}, idf: 0 };
      }
      index[word].docIds.add(id);
      index[word].frequencies[id] = (index[word].frequencies[id] || 0) + 1;
    });
  });

  const totalDocs = docs.length;
  Object.keys(index).forEach((word) => {
    const docCount = index[word].docIds.size;
    index[word].idf = Math.log10(totalDocs / docCount);
  });

  return { index, docWordCounts };
};

const cleanText = (text) =>
  text
    .replace(/[.,!?;:()"-]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const search = (docsArray, searchString) => {
  if (!searchString.trim() || !Array.isArray(docsArray)) return [];

  const { index, docWordCounts } = buildInvertedIndex(docsArray);
  const searchWords = new Set(cleanText(searchString).split(" "));
  const relevance = new Map();


  searchWords.forEach((word) => {
    if (index[word]) {
      index[word].docIds.forEach((docId) => {
        const tf = index[word].frequencies[docId] / docWordCounts.get(docId);
        const tfIdf = tf * index[word].idf;

        const score = (relevance.get(docId) || 0) + tfIdf;
        relevance.set(docId, score);
      });
    }
  });

  return [...relevance.entries()]
    .sort((a, b) => b[1] - a[1]) // Сортируем по TF-IDF
    .map(([docId]) => docId);
};

export default search;
