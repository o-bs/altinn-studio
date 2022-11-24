import React, {useCallback, useEffect, useMemo, useState} from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import { mdToSlate } from "./utils/slate-utils";
import { Leaf } from "./components/Leaf";
import { Element } from "./components/Element";
import classes from "./MarkdownEditor.module.css";
import { MarkButton } from "./components/MarkButton";
import { BlockButton } from "./components/BlockButton";
import {NodeType} from "./enums";
import { withHistory } from 'slate-history'

interface Props {
  markdown: string;
}

export const MarkdownEditor = ({ markdown }: Props) => {
  const [value, setValue] = useState<Descendant[]>([]);
  useEffect(() => {
    mdToSlate(markdown).then(setValue);
  }, [markdown]);

  const handleChange = useCallback((nextValue) => {
    setValue(nextValue);
    // serialize slate state to a markdown string
    //onChange(value.map((v) => serialize(v)).join(''));
  }, []);

  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  return (
    <>
      <div className={classes.container}>
        {value.length > 0 && (
          <Slate editor={editor} value={value} onChange={handleChange}>
            <div className={classes.toolbar}>
              <MarkButton format={NodeType.strongMark} />
              <MarkButton format={NodeType.emphasisMark} />
              <MarkButton format={NodeType.deleteMark} />
              <MarkButton format={NodeType.inlineCodeMark} />

              <BlockButton format={NodeType.heading}  />
              <BlockButton format={NodeType.heading2}  />
              <BlockButton format={NodeType.blockQuote} />
              <BlockButton format={NodeType.numberedList} />
              <BlockButton format={NodeType.list} />
              <BlockButton format={NodeType.codeBlock} />

              <BlockButton format={NodeType.link} />
              <BlockButton format={NodeType.image} />
              <BlockButton format={NodeType.thematicBreak} />

            </div>
            <Editable className={classes.editable}  renderLeaf={renderLeaf} renderElement={renderElement} />
          </Slate>
        )}
      </div>
      <pre style={{ fontSize: 10, padding: 20 }}>{JSON.stringify(value, null, 2)}</pre>
    </>
  );
};
