import React from "react";
import { Button, ButtonColor, ButtonSize, ButtonVariant } from "@altinn/altinn-design-system";
import { FormatIcon } from "./FromatIcon";
import { useSlate } from "slate-react";
import { isMarkActive, toggleMark } from "../utils/slate-utils";

export const MarkButton = ({ format }: any) => {
  const editor = useSlate();
  const onClick = (event) => {
    event.preventDefault();
    toggleMark(editor, format);
  };
  return (
    <Button
      style={{ width: 36, height: 36, opacity: isMarkActive(editor, format) ? 1 : 0.5 }}
      onClick={onClick}
      variant={ButtonVariant.Quiet}
      color={ButtonColor.Secondary}
      size={ButtonSize.Small}
      svgIconComponent={<FormatIcon format={format} style={{ width: "24px", height: "24px" }} />}
    />
  );
};
