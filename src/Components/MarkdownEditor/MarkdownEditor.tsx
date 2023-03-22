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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n" + "#".repeat(h) + " header"
            });
            textareaRef.current?.focus();
          }}>
            H{h}
          </Button>
        ))}
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n**BOLD**"
            });
            textareaRef.current?.focus();
          }}>
          Bold
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n*ITALIC*"
            });
            textareaRef.current?.focus();
          }}>
          Italic
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n***BOLD ITALIC***"
            });
            textareaRef.current?.focus();
          }}>
          Bold Italic
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n~~Strikethrough~~"
            });
            textareaRef.current?.focus();
          }}>
          Strikethrough
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n> Quote"
            });
            textareaRef.current?.focus();
          }}>
          Quote
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n```\r\n\r\n```\r\n"
            });
            textareaRef.current?.focus();
          }}>
          Code
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n|  |  |\r\n|--|--|\r\n|  |  |"
            });
            textareaRef.current?.focus();
          }}>
          Table
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n|  |  |"
            });
            textareaRef.current?.focus();
          }}>
          Row
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n[ALT](URL)"
            });
            textareaRef.current?.focus();
          }}>
          Link
        </Button>
        <Button onClick={() => {
            setDocument({
              ...document,
              markdown: document.markdown + "\r\n![ALT](https://hoosat.fi/logo512.png)"
            });
            textareaRef.current?.focus();
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