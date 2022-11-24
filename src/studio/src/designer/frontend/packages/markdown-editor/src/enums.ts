export enum NodeType {
  emphasisMark = "emphasis",
  inlineCodeMark = "inlineCode",
  strongMark = "strong",

  blockQuote = "blockquote",

  list = "list",
  listItem = "listItem",

  codeBlock = "code",
  heading = "heading",
  image = "image",

  link = "link",

  numberedList = "list",
  paragraph = "paragraph",

  thematicBreak = "thematic_break",
}

export enum ListType {
  numberedList = NodeType.numberedList,
  bulletedList = NodeType.list,
}