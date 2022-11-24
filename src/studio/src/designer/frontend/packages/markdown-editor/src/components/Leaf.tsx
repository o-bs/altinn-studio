import React from 'react';
import classNames from 'classnames';
import classes from './Leaf.module.css';

export const Leaf = ({ attributes, children, leaf }) => {
  return (
    <span
      {...attributes}
      className={classNames(
        { [classes.bold]: leaf.bold },
        { [classes.italic]: leaf.emphasis },
        { [classes.strikeThrough]: leaf.strikeThrough },
        { [classes.code]: leaf.inlineCode },
      )}
    >{children}</span>
  );
};