const cleanText = (text) =>
  text
    .replace(/[.,!?;:()"-]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const search = (docsArray, searchString) => {
  if (!searchString.trim() || !Array.isArray(docsArray)) return [];

  const searchWords = new Set(cleanText(searchString).split(/\s+/));

  return docsArray
    .reduce((acc, doc) => {
      const wordsInDoc = cleanText(doc.text).split(/\s+/);
      let uniqueMatches = 0;
      let totalMatches = 0;

      searchWords.forEach((word) => {
        const count = wordsInDoc.filter((w) => w === word).length;
        if (count > 0) {
          uniqueMatches += 1;
          totalMatches += count;
        }
      });
      if (uniqueMatches > 0) {
        acc.push({
          id: doc.id,
          uniqueMatches,
          totalMatches,
        });
      }
      return acc;
    }, [])
    .sort(
      (a, b) =>
        b.uniqueMatches - a.uniqueMatches || b.totalMatches - a.totalMatches
    )
    .map(({ id }) => id);
};

export default search;
