import Tag from "./Tag";

interface TagsProps {
  tags: string[];
  rightAlign?: boolean;
}

export default function Tags({ tags, rightAlign }: TagsProps) {
  if (!tags) return null;
  return (
    <ul
      className={`flex flex-wrap w-full ${rightAlign ? "justify-start" : "justify-end"}`}
      data-testid="tags"
    >
      {tags.map((tag) => (
        <Tag key={tag} text={tag} rightAlign={rightAlign} />
      ))}
    </ul>
  );
}
