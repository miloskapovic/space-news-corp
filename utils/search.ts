import Fuse from "fuse.js";

export default function searchFuse(
  query: string,
  items: Array<any>
): Array<any> {
  const options = {
    includeScore: true,
    minMatchCharLength: 3,
    threshold: 0.4,
    keys: ["title"],
  };

  const fuse = new Fuse(items, options);
  const result = fuse.search(query);

  return result.map(({ item }) => item);
}
