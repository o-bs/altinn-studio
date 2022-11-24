import React from 'react';
import classes from './EditReceiptContainer.module.css';
import VersionControlHeader from 'app-shared/version-control/versionControlHeader';
import { MarkdownEditor } from '@altinn/markdown-editor';


export const EditReceiptContainer = ({ language }: any) => {
  return (
    <div className={classes.root}>
      <VersionControlHeader language={language} />
      <div className={classes.container}>
        <h1>EditReceiptContainer</h1>
        <MarkdownEditor markdown={'## Hello World\nEn *helt* ny linje her\n\n1. Melk\n2. Brød\n3. Smør\n'} />
      </div>
    </div>
  );
};
