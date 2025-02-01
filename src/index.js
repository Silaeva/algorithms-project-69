const cleanText = (text) =>
  text
    .replace(/[.,!?;:()"-]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const countOccurrences = (text, search) => {
  const regex = new RegExp(`\\b${search}\\b`, "g");
  return (text.match(regex) || []).length;
};

const search = (docsArray, searchString) => {
  if (!searchString.trim()) return [];

  const cleanSearchString = cleanText(searchString);
  if (!docsArray || !Array.isArray(docsArray) || !cleanSearchString) return [];

  return docsArray
    .reduce((acc, doc) => {
      if (cleanText(doc.text).includes(cleanSearchString)) {
        acc.push({
          id: doc.id,
          occurrences: countOccurrences(doc.text, cleanSearchString),
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.occurrences - a.occurrences)
    .map(({ id }) => id);
};

export default search;
