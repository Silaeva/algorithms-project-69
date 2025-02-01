const cleanText = (text) => text.replace(/[.,!?;:()"-]/g, " ").toLowerCase().replace(/\s+/g, " ").trim();

const search = (docsArray, searchString) => {
  if (!searchString.trim()) return [];

  const cleanSearchString = cleanText(searchString);
  if (!docsArray || !Array.isArray(docsArray) || !cleanSearchString) return [];

  return docsArray.reduce((acc, doc) => {
    if (cleanText(doc.text).includes(cleanSearchString)) {
      acc.push(doc.id);
    }
    return acc;
  }, []);
};

export default search;
