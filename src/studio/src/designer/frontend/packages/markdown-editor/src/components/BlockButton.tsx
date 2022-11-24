import React from "react";
import { Button, ButtonColor, ButtonSize, ButtonVariant } from "@altinn/altinn-design-system";
import { FormatIcon } from "./FromatIcon";
import { isBlockActive, toggleBlock } from "../utils/slate-utils";
import { useSlate } from "slate-react";

export const BlockButton = ({ format }: any) => {
  const editor = useSlate();
  const onClick = (event) => {
    event.preventDefault();
    toggleBlock(editor, format);
  };
  const blockIsActive = isBlockActive(editor, format);
  return (
    <Button
      style={{ width: 36, height: 36, opacity: blockIsActive ? 1 : 0.5 }}
      onClick={onClick}
      variant={ButtonVariant.Quiet}
      color={ButtonColor.Secondary}
      size={ButtonSize.Small}
      svgIconComponent={<FormatIcon format={format} style={{ width: "24px", height: "24px" }} />}
    />
  );
};
