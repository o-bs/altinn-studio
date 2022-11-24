import React from "react";
import classes from "./Element.module.css";
import { NodeType } from "../enums";

export const Element = ({ attributes, children, element }) => {
  const attr = Object.assign({ style: { textAlign: element.align }, className: classes[element.type] }, attributes);
  return {
    [NodeType.blockQuote]: <blockquote {...attr}>{children}</blockquote>,
    [NodeType.codeBlock]: <code {...attr}>{children}</code>,
    [NodeType.deleteMark]: <s {...attr}>{children}</s>,
    [NodeType.emphasisMark]: <em {...attr}>{children}</em>,
    [NodeType.heading]: <h1 {...attr}>{children}</h1>,
    [NodeType.heading2]: <h2 {...attr}>{children}</h2>,
    [NodeType.heading3]: <h3 {...attr}>{children}</h3>,
    [NodeType.heading4]: <h4 {...attr}>{children}</h4>,
    [NodeType.heading5]: <h5 {...attr}>{children}</h5>,
    [NodeType.heading6]: <h6 {...attr}>{children}</h6>,
    [NodeType.image]: <img {...attr}>{children}</img>,
    [NodeType.inlineCodeMark]: <code {...attr}>{children}</code>,
    [NodeType.link]: <a {...attr}>{children}</a>,
    [NodeType.listItem]: <li {...attr}>{children}</li>,
    [NodeType.numberedList]: <ol {...attr}>{children}</ol>,
    [NodeType.paragraph]: <p {...attr}>{children}</p>,
    [NodeType.strongMark]: <strong {...attr}>{children}</strong>,
    [NodeType.thematicBreak]: <hr {...attr}>{children}</hr>,
    [NodeType.list]: <ul {...attr}>{children}</ul>,
  }[element.type];
};
