import React, { useEffect, useRef, useState } from 'react';
import { Button, Grid, GridItem, Input, Paragraph, Select, Textarea } from '../../HoosatUI';
import { Markdown } from '../../HoosatUI/';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [document, setDocument] = useState<Document>(
    (rest.document !== undefined)
      ? rest.document
      : { header: "", markdown: "" }
  );

  const addToTextarea = (element: string) => {
    let add = "";
    if(document.markdown !== "") {
      add += "\r\n";
    }
    add += element;
    setDocument({
      ...document,
      markdown: document.markdown + add 
    })
    textareaRef.current?.focus();
  }

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
            addToTextarea("#".repeat(h) + " header");
          }}>
            H{h}
          </Button>
        ))}
        <Button onClick={() => {
            addToTextarea("**BOLD**");
          }}>
          Bold
        </Button>
        <Button onClick={() => {
            addToTextarea("*ITALIC*");
          }}>
          Italic
        </Button>
        <Button onClick={() => {
            addToTextarea("***BOLD ITALIC***");
          }}>
          Bold Italic
        </Button>
        <Button onClick={() => {
            addToTextarea("~~Strikethrough~~");
          }}>
          Strikethrough
        </Button>
        <Button onClick={() => {
            addToTextarea("> Quote");
          }}>
          Quote
        </Button>
        <Button onClick={() => {
            addToTextarea("```\r\n\r\n```\r\n");
          }}>
          Code
        </Button>
        <Button onClick={() => {
            addToTextarea("| Th | Th |\r\n|----|----|\r\n| Td | Td |");
          }}>
          Table
        </Button>
        <Button onClick={() => {
            addToTextarea("| Td | Td |");
          }}>
          Row
        </Button>
        <Button onClick={() => {
            addToTextarea("[text](url)");
          }}>
          Link
        </Button>
        <Button onClick={() => {
            addToTextarea("![ALT](https://hoosat.fi/logo512.png)");
          }}>
          Image
        </Button>
      </GridItem>
      <textarea className="editorTextarea"
        ref={textareaRef}
        autoFocus={true}
        value={document.markdown}
        onChange={(e: React.BaseSyntheticEvent) => {
          setDocument({
            ...document,
            markdown: e.target.value
          });
        }}>
      </textarea>
      <Markdown className="editorViewer" markdown={document.markdown}></Markdown>
      <GridItem className='editorActions'>
        {rest.actions}
      </GridItem>
    </Grid>
  )
}