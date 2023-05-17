import React, { useRef } from 'react';
import { Button, Grid, GridItem, Input, Paragraph, Markdown } from '../../../../HoosatUI';

import "./MarkdownEditor.scss";

export interface MarkdownDocument {
  header: string | undefined,
  markdown: string | undefined,
}

export interface MarkdownDocumentLabels {
  header: string,
  markdown: string,
}

interface markdownEditorProps {
  actions: JSX.Element[] | JSX.Element;
  markdownDocument: MarkdownDocument | undefined,
  setMarkdownDocument: React.Dispatch<React.SetStateAction<MarkdownDocument>> 
  labels?: MarkdownDocumentLabels;
}

export const MarkdownEditor: React.FC<markdownEditorProps> = (rest) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addToTextarea = (element: string) => {
    let add = "";
    if(rest.markdownDocument === undefined) {
      return;
    }
    if(rest.markdownDocument.markdown !== "") {
      add += "\r\n";
    }
    add += element;
    rest.setMarkdownDocument({
      ...rest.markdownDocument,
      markdown: rest.markdownDocument.markdown + add 
    })
    textareaRef.current?.focus();
  }

  const updateHeader = (value: string) => {
    if(rest.markdownDocument === undefined) {
      return;
    }
    rest.setMarkdownDocument({
      ...rest.markdownDocument,
      header: value
    });
  }

  const updateMarkdown = (value: string) => {
    if(rest.markdownDocument === undefined) {
      return;
    }
    rest.setMarkdownDocument({
      ...rest.markdownDocument,
      markdown: value
    });
  }

  return (
    <Grid className="markdownEditor">
      <GridItem className="editorHeader">
        <Input label={rest.labels?.header} value={rest.markdownDocument?.header}
          onChange={(e: React.BaseSyntheticEvent) => {
            updateHeader(e.target.value);
          }}
        />
      </GridItem>
      <GridItem className='editorLabel' >
        <Paragraph>{rest.labels?.markdown}</Paragraph>
      </GridItem>
      <GridItem className="editorTools">
        { [1,2,3,4,5,6].map(h => (
          <Button 
            key={h}
            onClick={() => {
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
        value={rest.markdownDocument?.markdown}
        onChange={(e: React.BaseSyntheticEvent) => {
          updateMarkdown(e.target.value);
        }}>
      </textarea>
      <Markdown className="editorViewer" markdown={(rest.markdownDocument?.markdown !== undefined) ? rest.markdownDocument?.markdown : "" }></Markdown>
      <GridItem className='editorActions'>
        {rest.actions}
      </GridItem>
    </Grid>
  )
}