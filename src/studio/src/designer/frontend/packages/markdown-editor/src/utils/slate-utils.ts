import { unified } from "unified";
import remarkParse from "remark-parse";
import { remarkToSlate } from "remark-slate-transformer";
import { Descendant, Editor, Transforms, Element, Node } from "slate";
import { ListType, NodeType } from "../enums";

export const mdToSlate = async (input: string): Promise<Descendant[]> => {
  const root = await unified().use(remarkParse).use(remarkToSlate).processSync(input);
  return root.result as Descendant[];
};

export const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      // @ts-ignore
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
    })
  );
  return !!match;
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleBlock = (editor, format) => {
  const listTypes = Object.values(ListType);
  const isActive = isBlockActive(editor, format);
  const isList = listTypes.includes(format);
  Transforms.unwrapNodes(editor, {
    match: (n: Node) =>
      // @ts-ignore
      !Editor.isEditor(n) && Element.isElement(n) && listTypes.includes(n.type),
    split: true,
  });
  Transforms.setNodes<Element>(editor, {
    // @ts-ignore
    type: isActive ? NodeType.paragraph : isList ? NodeType.listItem : format,
  });
  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor, format) =>
  isMarkActive(editor, format) ? Editor.removeMark(editor, format) : Editor.addMark(editor, format, true);
