import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PagesDTO, SessionDTO } from '../../@types';
import { AddPageModal } from '../../Components/AddPageModal/AddPageModal';
import { MarkdownEditor } from '../../Components/MarkdownEditor/MarkdownEditor';
import { Icons, Button, Flex, Heading, List, ListItem, PageBuilder, TableBuilder, Grid  } from '../../HoosatUI/';

import "./Pages.scss";

interface PagesProps {
  session: SessionDTO;
}


export const Pages: React.FC<PagesProps> = (props: PagesProps) => {
  console.log(window.location.hostname)
  const [ t, i18n ] = useTranslation();
  const [ addPageModalOpen, setAddPageModalOpen ] = useState(false);
  const [ pages, setPages ] = useState<PagesDTO[]>([]);
  const [ selectedLine, setSelectedLine ] = useState("");
  const [ selectedPage, setSelectedPage ] = useState<PagesDTO>({
    markdown: "",
    name: "",
  });
  const [ selectedComponent, setSelectedComponent] = useState("table");

  const getPagesByDomain = useCallback(() => {
    const fetchPages = async () => {
      const api = process.env.REACT_APP_AUTHENTICATION_API;
      if(api === undefined) {
        if(process.env.NODE_ENV === "development") console.log("REACT_APP_AUTHENTICATION_API has not been set in environment.");
        return;
      }
      const uri = `${api}/pages/domain/${'localhost'}`;
      const fetchResult = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "http://localhost:3000",
          'Access-Control-Allow-Credentials': 'true'
        }
      });
      const response = await fetchResult.json();
      if(process.env.NODE_ENV === "development") console.log(response);
      if(response.result === "success") {
        setPages(response.pages)
      } else {
        setPages([])
      }
    }
    fetchPages();
  }, []);

  useEffect(getPagesByDomain, [addPageModalOpen]);

  return (
    <>
    { (selectedComponent === "table") &&
      <PageBuilder className='pages' 
        header={
            <Heading variant="h1">{t("pages.header")}</Heading>
        }
        navigation={
          <List>
            <ListItem>
              <Button onClick={() => { setAddPageModalOpen(true) }}>{t("pages.add-button")}</Button>
            </ListItem>
          </List>
        }
        content={
          <Flex>
              <TableBuilder headers={["NAME", "URL", "ICON", "DOMAIN", "CONTENT", "DELETE"]} 
                rows={(pages !== undefined) ? pages.map(page => ({
                  _id: (page._id !== undefined) ? page._id : "",
                  selected: (selectedLine === page._id),
                  data: {
                    name: page.name,
                    link: page.link,
                    icon: <Icons icon={(page.icon !== undefined) ? page.icon : ""} type={'outline'} style={{ width: "24px"}}></Icons>,
                    domain: page.domain,
                    modify: <Button onClick={() => {
                      // TODO: Delete page.
                      setSelectedPage(page);
                      setSelectedComponent("editor");
                    }}>{t("pages.modify-page-button")}</Button>,
                    
                    delete: <Button onClick={() => {
                      // TODO: Delete page.
                    }}>{t("pages.delete-page-button")}</Button>
                  },
                  onClick: () => {
                    setSelectedLine((page._id !== undefined) ? page._id: "");
                  }
                })
                ): []
              } 
            />
          
          </Flex>
        }
      />
      
    }
    { (selectedComponent === "editor") && 
      <Flex>
        <MarkdownEditor 
          labels={{
            header: "Otsikko",
            markdown: "Editori"
          }}
          document={{ 
            header: (selectedPage?.name !== undefined) ? selectedPage.name : "", 
            markdown: (selectedPage?.markdown !== undefined) ? selectedPage.markdown : "" 
          }}
          actions={
            <Grid className='editor-buttons'>
              <Button onClick={() => {
                  setSelectedComponent("table")
                }}>{t("pages.editor.back-button")}</Button>
              <Button onClick={() => {}}>{t("pages.editor.save-button")}</Button>
            </Grid>
          }
        /> 
      </Flex>
    }
    { addPageModalOpen === true && <AddPageModal setShowModal={setAddPageModalOpen} session={props.session}></AddPageModal> }
    </>
    
  );
} 