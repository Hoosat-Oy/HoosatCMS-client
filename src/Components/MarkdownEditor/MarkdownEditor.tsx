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

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && props.markdownDocument?.markdown !== textarea.defaultValue) {
      textarea.defaultValue = props.markdownDocument?.markdown || '';
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
  
    const { selectionStart, selectionEnd } = textarea;
  
    props.setMarkdownDocument((prevState) => ({
      ...prevState,
      markdown: value,
    }));
    const prevStack = undoStack[undoStack.length - 1];
    if (prevStack && prevStack.value === value) {
      prevStack.selectionStart = selectionStart;
      prevStack.selectionEnd = selectionEnd;
    } else {
      setUndoStack([
        ...undoStack,
        {
          value,
          selectionStart,
          selectionEnd,
        },
      ]);
    }
  
    setRedoStack([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'Z') {
      event.preventDefault();
      redo();
    } else if (event.ctrlKey && event.key === 'z') {
      event.preventDefault();
      undo();
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
        textarea.value.substring(0, selectionStart) +
        formattedText +
        textarea.value.substring(selectionEnd);
  
      props.setMarkdownDocument((prevState) => ({
        ...prevState,
        markdown: updatedValue,
      }));
  
      // Store the previous state value and selection positions
      const previousValue = textarea.value;
      const previousSelectionStart = selectionStart;
      const previousSelectionEnd = selectionEnd;
  
      setUndoStack((prevStack) => [
        ...prevStack,
        {
          value: previousValue, // Use the stored previous value
          selectionStart: previousSelectionStart,
          selectionEnd: previousSelectionEnd,
        },
      ]);
  
      textarea.focus();
      textarea.value = updatedValue;
      textarea.selectionStart = selectionStart + formattedText.length;
      textarea.selectionEnd = selectionStart + formattedText.length;
  
      setRedoStack([]);
    }
  };

  const undo = () => {
    console.log("undo called!");
    if (undoStack.length === 0) {
      return;
    }
    const previousState = undoStack[undoStack.length - 1];
    const updatedRedoStack = [
      {
        value: previousState.value,
        selectionStart: previousState.selectionStart,
        selectionEnd: previousState.selectionEnd,
      },
      ...redoStack,
    ];
    const updatedUndoStack = undoStack.slice(0, undoStack.length - 1);
    setUndoStack(updatedUndoStack);
    setRedoStack(updatedRedoStack);
    if (updatedUndoStack.length > 0) {
      const stack = updatedUndoStack[updatedUndoStack.length - 1];
      props.setMarkdownDocument((prevState) => ({
        ...prevState,
        markdown: stack.value,
      }));
    } else {
      props.setMarkdownDocument((prevState) => ({
        ...prevState,
        markdown: '', // Set the markdown value to an appropriate default value when undoStack is empty
      }));
    }
  };
  
  const redo = () => {
    if (redoStack.length === 0) {
      return;
    }

    const nextState = redoStack[0];
    const updatedUndoStack = [
      ...undoStack,
      {
        value: nextState?.value || '',
        selectionStart: nextState?.selectionStart || 0,
        selectionEnd: nextState?.selectionEnd || 0,
      },
    ];
    const updatedRedoStack = redoStack.slice(1);

    setUndoStack(updatedUndoStack);
    setRedoStack(updatedRedoStack);

    props.setMarkdownDocument((prevState) => ({
      ...prevState,
      markdown: nextState?.value || '',
    }));

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.value = nextState?.value || '';
      textarea.selectionStart = nextState?.selectionStart || 0;
      textarea.selectionEnd = nextState?.selectionEnd || 0;
      textarea.focus();
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
        <Button onClick={() => addToTextarea('**BOLD**')}>Bold</Button>
        <Button onClick={() => addToTextarea('*ITALIC*')}>Italic</Button>
        <Button onClick={() => addToTextarea('***BOLD ITALIC***')}>
          Bold Italic
        </Button>
        <Button onClick={() => addToTextarea('~~Strikethrough~~')}>
          Strikethrough
        </Button>
        <Button onClick={() => addToTextarea('> Quote')}>Quote</Button>
        <Button onClick={() => addToTextarea('```\r\n\r\n```\r\n')}>
          Code
        </Button>
        <Button onClick={() => addToTextarea('| Th | Th |\r\n|----|----|\r\n| Td | Td |')}>
          Table
        </Button>
        <Button onClick={() => addToTextarea('| Td | Td |')}>Row</Button>
        <Button onClick={() => addToTextarea('[text](url)')}>Link</Button>
        <Button onClick={() => addToTextarea('![ALT](https://hoosat.fi/logo512.png)')}>
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
      <GridItem className="editorActions">{props.actions}</GridItem>
    </Grid>
  );
};
