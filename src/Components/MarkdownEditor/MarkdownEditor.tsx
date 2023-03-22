import React, { useEffect, useRef, useState } from 'react';
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
      <GridItem className='editorLabel' >
        <Paragraph>{rest.labels?.markdown}</Paragraph>
      </GridItem>
      <GridItem className="editorTools">
        { [1,2,3,4,5,6].map(h => (
          <Button onClick={(e) => {
            e.preventDefault();
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n" + "#".repeat(h) + " header"
            });
          }}>
            H{h}
          </Button>
        ))}
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n**BOLD**"
            });
          }}>
          Bold
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n*ITALIC*"
            });
          }}>
          Italic
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n***BOLD ITALIC***"
            });
          }}>
          Bold Italic
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n~~Strikethrough~~"
            });
          }}>
          Strikethrough
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n> Quote"
            });
          }}>
          Quote
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n```\r\n\r\n```\r\n"
            });
          }}>
          Code
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n|  |  |\r\n|--|--|\r\n|  |  |"
            });
          }}>
          Table
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n|  |  |"
            });
          }}>
          Row
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n[ALT](URL)"
            });
          }}>
          Link
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n![ALT](https://hoosat.fi/logo512.png)"
            });
          }}>
          Image
        </Button>
      </GridItem>
      <Textarea className="editorTextarea"
        autoFocus={true}
        value={document.markdown}
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