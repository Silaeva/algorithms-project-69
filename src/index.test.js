import search from "./index.js";

const docs = [
  { id: "doc1", text: "I can't shoot straight unless I've had a pint!" },
  { id: "doc2", text: "Don't shoot shoot shoot that thing at me." },
  { id: "doc3", text: "I'm your shooter." },
  { id: "doc4", text: "Shooting and targeting are skills of a good shooter." },
];

describe("search function", () => {
  test("Search finds relevant documents and sorts by TF-IDF", () => {
    expect(search(docs, "shoot at me")).toEqual(["doc2", "doc1"]);
    expect(search(docs, "shooter")).toEqual(["doc3", "doc4"]);
    expect(search(docs, "can't straight")).toEqual(["doc1"]);
  });

  test("Search is case-insensitive and ignores punctuation", () => {
    expect(search(docs, "SHOOT.")).toEqual(["doc2", "doc1"]);
    expect(search(docs, "shooter!!")).toEqual(["doc3", "doc4"]);
  });

  test("Search handles multiple words and ranks correctly", () => {
    expect(search(docs, "shoot shooter")).toEqual([
      "doc2",
      "doc3",
      "doc1",
      "doc4",
    ]);
    expect(search(docs, "skills of a good shooter")).toEqual([
      "doc4",
      "doc3",
      "doc1",
    ]);
  });

  test("Search returns an empty array when no match is found", () => {
    expect(search(docs, "randomword")).toEqual([]);
    expect(search(docs, "xyz")).toEqual([]);
  });

  test("Handles empty search string gracefully", () => {
    expect(search(docs, "")).toEqual([]);
    expect(search(docs, "    ")).toEqual([]);
  });

  test("Handles documents with repeated words correctly", () => {
    expect(search(docs, "shoot")).toEqual(["doc2", "doc1"]);
    expect(search(docs, "shooting")).toEqual(["doc4"]);
  });
});
