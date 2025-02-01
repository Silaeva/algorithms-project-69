const search = (docsArray, searchString) => {
  if (!searchString) return [];
  return docsArray.reduce((acc, doc) => {
    if (doc.text.toLowerCase().includes(searchString.toLowerCase())) {
      acc.push(doc.id);
    }
    return acc;
  }, []);
};

export default search;
