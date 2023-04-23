import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageDTO, SessionDTO } from '../../@types';
import { Button, Flex, Grid, Heading, List, ListItem, PageBuilder,   } from '../../HoosatUI/';

import "./Pages.css";
import { AddPage } from '../../Components/Pages/AddPage';
import { ListPages } from '../../Components/Pages/ListPages';
import { MarkdownDocument, MarkdownEditor } from '../../Components/MarkdownEditor/MarkdownEditor';
import { UpdatePage } from '../../Controllers/Posts/Pages';

interface PagesProps {
  session: SessionDTO;
}

export const Pages: React.FC<PagesProps> = (props: PagesProps) => {
  const [ t, i18n ] = useTranslation();
  const [ currentComponent, setCurrentComponent] = useState<string>("pages.list");
  const [ currentPage, setCurrentPage ] = useState<PageDTO>({
    _id: "",
    group: "",
    author: "",
    name: "",
    link: "/index",
    markdown: "",
    icon: "",
    domain: ""
  });
  const [ markdownDocument, setMarkdownDocument] = useState<MarkdownDocument>({
    header: "",
    markdown: "",
  });

  return (
    <PageBuilder className='pages' 
      header={
          <Heading variant="h1">{t("pages.header")}</Heading>
      }
      navigation={
        <List>
          <ListItem>
            <Button onClick={() => { setCurrentComponent("pages.list") }}>{t("pages.list-button")}</Button>
          </ListItem>
          <ListItem>
            <Button onClick={() => { setCurrentComponent("pages.add") }}>{t("pages.add-button")}</Button>
          </ListItem>
        </List>
      }
      content={
        (currentComponent === "pages.add") 
        ? <AddPage 
            session={props.session} 
            closeComponent={() => {
              setCurrentComponent("pages.list")
            }}
          />
        : (currentComponent === "pages.markdown") 
        ? <MarkdownEditor 
            actions={
              <Grid className='editor-actions'>
                <Button 
                  key="back-button"
                  onClick={() => {
                    setCurrentComponent("pages.list");
                  }}>
                  {t("pages.editor.back-button")}
                </Button>
                <Button 
                  key="save-button"
                  onClick={async () => { 
                    //updatePage(props.session, selectedPage, markdownDocument); 
                    await UpdatePage(props.session, {
                      ...currentPage,
                      name: markdownDocument.header,
                      markdown: markdownDocument.markdown,
                    });
                    setCurrentComponent("pages.list");
                  }}>
                  {t("pages.editor.save-button")}
                </Button>
              </Grid>
            } 
            markdownDocument={markdownDocument}
            setMarkdownDocument={setMarkdownDocument}
          />
        : <ListPages 
            session={props.session}
            openEditor={(page: PageDTO) => {
              setCurrentPage(page);
              setMarkdownDocument({ 
                header: page.name,
                markdown: page.markdown,
              });
              setCurrentComponent("pages.markdown")
            }}
          />         
      }
    />
  );
} 