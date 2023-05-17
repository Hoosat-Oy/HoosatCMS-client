import React, { useState } from 'react';
import { MarkdownDocument, PageDTO, SessionDTO } from '../../@types';
import { Button, Flex, Grid, Heading } from '../../HoosatUI';
import { MarkdownEditor } from '../../Components/MarkdownEditor/MarkdownEditor';
import { useTranslation } from 'react-i18next';

interface PageEditorProps {
  session: SessionDTO;
  page: PageDTO;
  updatePage: (session: SessionDTO, page: PageDTO) => void
  closeComponent: () => void,
}

export const PageEditor: React.FC<PageEditorProps> = (props: PageEditorProps) => {
  const [ t ] = useTranslation();
  const [ markdownDocument, setMarkdownDocument ] = useState<MarkdownDocument>({
    header: props.page.name,
    markdown: props.page.markdown,
  });

  const updatePageMarkdown = async(session: SessionDTO, page: PageDTO, markdownDocument: MarkdownDocument) => {
    page.name = markdownDocument.header;
    page.markdown = markdownDocument.markdown;
    props.updatePage(session, page);
  }

  return (
    <Flex>
        <Heading variant='h3'>
          {t("pages.editor.heading")}
        </Heading>
        <MarkdownEditor 
          labels={{
            header: "Otsikko",
            markdown: "Editori"
          }}
          markdownDocument={markdownDocument}
          setMarkdownDocument={setMarkdownDocument}
          actions={
            <Grid className='editor-actions'>
              <Grid className='editor-buttons'>
                <Button onClick={props.closeComponent}>
                  {t("pages.editor.back-button")}
                </Button>
                <Button onClick={() => { 
                    updatePageMarkdown(props.session, props.page, markdownDocument); 
                  }}>
                  {t("pages.editor.save-button")}
                </Button>
              </Grid>
            </Grid>
          }
        />
      </Flex>
  )
}