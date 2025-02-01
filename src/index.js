const buildInvertedIndex = (docs) => {
  const index = {};

  docs.forEach(({ id, text }) => {
    const words = cleanText(text).split(" ");
    words.forEach((word) => {
      if (!index[word]) {
        index[word] = { docIds: new Set(), frequencies: {} };
      }
      index[word].docIds.add(id);
      index[word].frequencies[id] = (index[word].frequencies[id] || 0) + 1;
    });
  });

  return index;
};

const cleanText = (text) =>
  text
    .replace(/[.,!?;:()"-]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const search = (docsArray, searchString) => {
  if (!searchString.trim() || !Array.isArray(docsArray)) return [];

  const index = buildInvertedIndex(docsArray);
  const searchWords = new Set(cleanText(searchString).split(" "));
  const relevance = new Map();

  searchWords.forEach((word) => {
    if (index[word]) {
      index[word].docIds.forEach((docId) => {
        const uniqueMatches = (relevance.get(docId)?.uniqueMatches || 0) + 1;
        const totalMatches =
          (relevance.get(docId)?.totalMatches || 0) +
          index[word].frequencies[docId];

        relevance.set(docId, { uniqueMatches, totalMatches });
      });
    }
  });

  return [...relevance.entries()]
    .sort(
      (a, b) =>
        b[1].uniqueMatches - a[1].uniqueMatches ||
        b[1].totalMatches - a[1].totalMatches
    )
    .map(([docId]) => docId);
};

export default search;
