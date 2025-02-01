import search from "./index.js";

describe("search function", () => {
  const documents = [
    { id: 1, text: "Hello world" },
    { id: 2, text: "Jest is great" },
    { id: 3, text: "Unit tests are important" },
    { id: 4, text: "Hello again" },
    { id: 5, text: "Find-me if you can..." },
    { id: 6, text: "Hello again and again" },
    { id: 7, text: "I can't shoot straight unless I've had a pint!" },
    { id: 8, text: "Don't shoot shoot shoot that thing at me." },
    { id: 9, text: "I'm your shooter." },
  ];

  test("finds documents containing the search string", () => {
    expect(search(documents, "hello")).toEqual([1, 4, 6]);
  });

  test("returns an empty array if no matches are found", () => {
    expect(search(documents, "notfound")).toEqual([]);
  });

  test("is case insensitive", () => {
    expect(search(documents, "JEST")).toEqual([2]);
  });

  test("returns an empty array if search string is empty", () => {
    expect(search(documents, "")).toEqual([]);
  });

  test("ignores punctuation in documents and search queries", () => {
    expect(search(documents, "Hello!")).toEqual([1, 4, 6]);
    expect(search(documents, "unit tests")).toEqual([3]);
    expect(search(documents, "Find me?")).toEqual([5, 8]);
  });

  test("returns documents sorted by relevance", () => {
    expect(search(documents, "again")).toEqual([6, 4]);
  });

  test("returns documents sorted by relevance", () => {
    expect(search(documents, "shoot at me")).toEqual([8, 5, 7]);
    expect(search(documents, "shooter")).toEqual([9]);
  });

  test("ignores punctuation and case", () => {
    expect(search(documents, "SHOOT.")).toEqual([8, 7]);
    expect(search(documents, "aT mE!")).toEqual([8, 5]);
  });

  test("search handles multiple words correctly", () => {
    expect(search(documents, "shoot straight")).toEqual([7, 8]);
    expect(search(documents, "thing at me")).toEqual([8, 5]);
  });

  test("returns an empty array when no matches", () => {
    expect(search(documents, "nonexistentword")).toEqual([]);
  });

  test("handles empty or invalid inputs", () => {
    expect(search([], "shoot")).toEqual([]);
    expect(search(null, "shoot")).toEqual([]);
    expect(search(documents, "   ")).toEqual([]);
  });
});
