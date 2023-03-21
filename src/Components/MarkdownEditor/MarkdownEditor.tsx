import React, { useState } from 'react';
import { Button, Grid, GridItem, Input, Paragraph, Select, Textarea } from '../../HoosatUI';
import { Markdown } from '../Common/Markdown/Markdown';

import "./MarkdownEditor.scss";

interface Document {
  header: string,
  markdown: string,
}

interface DocumentLabels {
  header: string,
  markdown: string,
}

interface markdownEditorProps {

  actions: JSX.Element[] | JSX.Element;
  document?: Document;
  labels?: DocumentLabels;
}

export const MarkdownEditor: React.FC<markdownEditorProps> = (rest) => {
  const [document, setDocument] = useState<Document>(
    (rest.document !== undefined)
      ? rest.document
      : { header: "", markdown: "" }
  );
  return (
    <Grid className="markdownEditor">
      <GridItem className="editorHeader">
        <Input label={rest.labels?.header} value={document.header}
          onChange={(e: React.BaseSyntheticEvent) => {
            setDocument({
              ...document,
              header: e.target.value
            });
          }}
        />
      </GridItem>
      <GridItem className='editorLabel'>
        <Paragraph>{rest.labels?.markdown}</Paragraph>
      </GridItem>
      <GridItem className="editorTools">
        <Button
          onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "```\r\n\r\n```\r\n"
            });
          }}>
          CODE
        </Button>
        <Button
          onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n# "
            });
          }}>
          H1
        </Button>

        <Button
          onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n## "
            });
          }}>
          H2
        </Button>

        <Button
          onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n### "
            });
          }}>
          H3
        </Button>

        <Button
          onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n#### "
            });
          }}>
          H4
        </Button>

        <Button
          onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n##### "
            });
          }}>
          H5
        </Button>

        <Button
          onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n###### "
            });
          }}>
          H6
        </Button>
      </GridItem>
      <Textarea className="editorTextarea"
        value={document.markdown}
        title="Github flavored markdown!"
        onChange={(e: React.BaseSyntheticEvent) => {
          setDocument({
            ...document,
            markdown: e.target.value
          });
        }}>
      </Textarea>
      <Markdown className="editorViewer" markdown={document.markdown}></Markdown>
      <GridItem className='editorActions'>
        {rest.actions}
      </GridItem>
    </Grid>
  )
}