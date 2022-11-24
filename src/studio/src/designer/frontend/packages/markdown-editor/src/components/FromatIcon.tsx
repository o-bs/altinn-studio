import React from "react";
import { NodeType} from "../enums";
import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote, FormatStrikethrough, Image, InsertPageBreak, Link,
  Subtitles,
  Title,
} from "@mui/icons-material";

export const FormatIcon = ({ format, style }) => {
  return {
    [NodeType.strongMark]: <FormatBold style={style} />,
    [NodeType.emphasisMark]: <FormatItalic style={style} />,
    [NodeType.deleteMark]: <FormatStrikethrough style={style} />,
    [NodeType.inlineCodeMark]: <Code style={style} />,

    [NodeType.heading]: <Title style={style} />,
    [NodeType.heading2]: <Subtitles style={style} />,
    [NodeType.blockQuote]: <FormatQuote style={style} />,
    [NodeType.numberedList]: <FormatListNumbered style={style} />,
    [NodeType.list]: <FormatListBulleted style={style} />,
    [NodeType.codeBlock]: <Code style={style} />,

    [NodeType.link]: <Link style={style} />,
    [NodeType.image]: <Image style={style} />,
    [NodeType.thematicBreak]: <InsertPageBreak style={style} />,
  }[format];
};
