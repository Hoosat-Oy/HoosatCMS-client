import React, { useRef, useEffect, useState } from 'react';
import { Button, Grid, GridItem, Input, Paragraph, Markdown } from '../../../../HoosatUI';

import './MarkdownEditor.css';

export interface MarkdownDocument {
  header: string | undefined;
  markdown: string | undefined;
}

export interface MarkdownDocumentLabels {
  header: string;
  markdown: string;
}

interface MarkdownEditorProps {
  actions: JSX.Element[] | JSX.Element;
  markdownDocument: MarkdownDocument | undefined;
  setMarkdownDocument: React.Dispatch<React.SetStateAction<MarkdownDocument>>;
  labels?: MarkdownDocumentLabels;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [undoStack, setUndoStack] = useState<{ value: string, selectionStart: number, selectionEnd: number }[]>([]);
  const [redoStack, setRedoStack] = useState<{ value: string, selectionStart: number, selectionEnd: number }[]>([]);

  const historyIndexRef = useRef<number>(0);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && props.markdownDocument?.markdown !== textarea.value) {
      textarea.value = props.markdownDocument?.markdown || '';
    }
  }, [props.markdownDocument]);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
  
    // Prevent overwriting the textarea value if it was updated externally
    const textarea = textareaRef.current;
    if (textarea && value !== textarea.value) {
      return;
    }
  
    if (textarea === null) {
      return;
    }
  
    props.setMarkdownDocument((prevState) => ({
      ...prevState,
      markdown: value,
    }));
  
    const { selectionStart, selectionEnd } = textarea;
    const prevStack = undoStack[historyIndexRef.current - 1];
    if (prevStack && prevStack.value === value) {
      prevStack.selectionStart = selectionStart;
      prevStack.selectionEnd = selectionEnd;
    } else {
      const updatedStack = [
        ...undoStack.slice(0, historyIndexRef.current),
        {
          value,
          selectionStart,
          selectionEnd,
        },
        ...undoStack.slice(historyIndexRef.current),
      ];
      setUndoStack(updatedStack);
      historyIndexRef.current++;
    }
  
    setRedoStack([]); // Clear redo stack
  };
  
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey) {
      if (event.key === 'z') {
        event.preventDefault();
        undo();
      } else if (event.key === 'Z' && event.shiftKey) {
        event.preventDefault();
        redo();
      }
    }
  };
  

  const addToTextarea = (element: string) => {
    if (props.markdownDocument === undefined) {
      return;
    }
  
    const textarea = textareaRef.current;
    if (textarea) {
      const { selectionStart, selectionEnd } = textarea;
      const selectedText = textarea.value.substring(selectionStart, selectionEnd);
      let formattedText = '';
  
      if (element === '# header') {
        formattedText = `# ${selectedText}`;
      } else if (element === '## header') {
        formattedText = `## ${selectedText}`;
      } else if (element === '### header') {
        formattedText = `### ${selectedText}`;
      } else if (element === '#### header') {
        formattedText = `#### ${selectedText}`;
      } else if (element === '##### header') {
        formattedText = `##### ${selectedText}`;
      } else if (element === '###### header') {
        formattedText = `###### ${selectedText}`;
      } else if (element === '**BOLD**') {
        formattedText = `**${selectedText}**`;
      } else if (element === '*ITALIC*') {
        formattedText = `*${selectedText}*`;
      } else if (element === '~~Strikethrough~~') {
        formattedText = `~~${selectedText}~~`;
      } else if (element === '> Quote') {
        formattedText = `> ${selectedText}`;
      } else if (element === '```\r\n\r\n```\r\n') {
        formattedText = '```\r\n' + selectedText + '\r\n```\r\n';
      } else {
        formattedText = element;
      }
  
      const updatedValue =
        props.markdownDocument.markdown?.substring(0, selectionStart) +
        formattedText +
        props.markdownDocument.markdown?.substring(selectionEnd);
  
      textarea.focus();
      textarea.value = updatedValue;
      textarea.selectionStart = selectionStart + formattedText.length;
      textarea.selectionEnd = selectionStart + formattedText.length;
  
      setUndoStack((prevStack) => [
        ...prevStack,
        {
          value: textarea.value,
          selectionStart: textarea.selectionStart,
          selectionEnd: textarea.selectionEnd,
        },
      ]);
  
      props.setMarkdownDocument((prevState) => ({
        ...prevState,
        markdown: updatedValue,
      }));
  
      setRedoStack([]); // Clear redo stack
    }
  };
  
  
  const undo = () => {
    const textarea = textareaRef.current;
    if (textarea && undoStack.length > 0 && historyIndexRef.current > 0) {
      historyIndexRef.current--;
      const previousState = undoStack[historyIndexRef.current];
      if (previousState) {
        setRedoStack((prevStack) => [
          {
            value: textarea.value,
            selectionStart: textarea.selectionStart,
            selectionEnd: textarea.selectionEnd,
          },
          ...prevStack,
        ]);
        textarea.focus();
        textarea.value = previousState.value;
        textarea.selectionStart = previousState.selectionStart;
        textarea.selectionEnd = previousState.selectionEnd;
  
        props.setMarkdownDocument((prevState) => ({
          ...prevState,
          markdown: previousState.value,
        }));
      }
    }
  };
  
  const redo = () => {
    const textarea = textareaRef.current;
    if (textarea && redoStack.length > 0) {
      historyIndexRef.current++;
      const nextState = redoStack[0];
      if (nextState) {
        setUndoStack((prevStack) => [
          ...prevStack,
          {
            value: textarea.value,
            selectionStart: textarea.selectionStart,
            selectionEnd: textarea.selectionEnd,
          },
        ]);
        textarea.focus();
        textarea.value = nextState.value;
        textarea.selectionStart = nextState.selectionStart;
        textarea.selectionEnd = nextState.selectionEnd;
  
        props.setMarkdownDocument((prevState) => ({
          ...prevState,
          markdown: nextState.value,
        }));
  
        setRedoStack((prevStack) => prevStack.slice(1));
      }
    }
  };
  
  
  

  return (
    <Grid className="markdownEditor">
      <GridItem className="editorHeader">
        <Input
          label={props.labels?.header}
          value={props.markdownDocument?.header}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.setMarkdownDocument((prevState) => ({
              ...prevState,
              header: e.target.value,
            }));
          }}
        />
      </GridItem>
      <GridItem className="editorLabel">
        <Paragraph>{props.labels?.markdown}</Paragraph>
      </GridItem>
      <GridItem className="editorTools">
        {[1, 2, 3, 4, 5, 6].map((h) => (
          <Button
            key={h}
            onClick={() => {
              addToTextarea('#'.repeat(h) + ' header');
            }}
          >
            H{h}
          </Button>
        ))}
        <Button
          onClick={() => {
            addToTextarea('**BOLD**');
          }}
        >
          Bold
        </Button>
        <Button
          onClick={() => {
            addToTextarea('*ITALIC*');
          }}
        >
          Italic
        </Button>
        <Button
          onClick={() => {
            addToTextarea('***BOLD ITALIC***');
          }}
        >
          Bold Italic
        </Button>
        <Button
          onClick={() => {
            addToTextarea('~~Strikethrough~~');
          }}
        >
          Strikethrough
        </Button>
        <Button
          onClick={() => {
            addToTextarea('> Quote');
          }}
        >
          Quote
        </Button>
        <Button
          onClick={() => {
            addToTextarea('```\r\n\r\n```\r\n');
          }}
        >
          Code
        </Button>
        <Button
          onClick={() => {
            addToTextarea('| Th | Th |\r\n|----|----|\r\n| Td | Td |');
          }}
        >
          Table
        </Button>
        <Button
          onClick={() => {
            addToTextarea('| Td | Td |');
          }}
        >
          Row
        </Button>
        <Button
          onClick={() => {
            addToTextarea('[text](url)');
          }}
        >
          Link
        </Button>
        <Button
          onClick={() => {
            addToTextarea('![ALT](https://hoosat.fi/logo512.png)');
          }}
        >
          Image
        </Button>
      </GridItem>
      <textarea
        className="editorTextarea"
        ref={textareaRef}
        autoFocus={true}
        value={props.markdownDocument?.markdown}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      ></textarea>
      <Markdown
        className="editorViewer"
        markdown={props.markdownDocument?.markdown || ''}
      />
      <GridItem className="editorActions">
        {props.actions}
      </GridItem>
    </Grid>
  );
};
