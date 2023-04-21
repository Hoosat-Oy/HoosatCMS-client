import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PagesDTO, SessionDTO } from '../../@types';
import { AddPageModal } from '../../Components/AddPageModal/AddPageModal';
import { MarkdownDocument, MarkdownEditor } from '../../Components/MarkdownEditor/MarkdownEditor';
import { Icons, Button, Flex, Heading, List, ListItem, PageBuilder, TableBuilder, Grid, Message  } from '../../HoosatUI/';

import "./Pages.scss";

interface PagesProps {
  session: SessionDTO;
}


export const Pages: React.FC<PagesProps> = (props: PagesProps) => {
  console.log(window.location.hostname)
  const [ t, i18n ] = useTranslation();
  const [ addPageModalOpen, setAddPageModalOpen ] = useState(false);
  const [ message, setMessage ] = useState({ type: "", message: ""})
  const [ pages, setPages ] = useState<PagesDTO[]>([]);
  const [ selectedLine, setSelectedLine ] = useState("");
  const [ selectedPage, setSelectedPage ] = useState<PagesDTO>({
    markdown: "",
    name: "",
  });
  const [ selectedComponent, setSelectedComponent] = useState("table");
  const [ markdownDocument, setMarkdownDocument ] = useState<MarkdownDocument>({
    header: "",
    markdown: "",
  });

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

  const updatePageMarkdown = async (session: SessionDTO, page: PagesDTO, markdownDocument: MarkdownDocument) => {
    page.name = markdownDocument.header;
    page.markdown = markdownDocument.markdown;
    await updatePage(session, page);
  }

  const updatePage = async (session: SessionDTO, page: PagesDTO) => {
    const api = process.env.REACT_APP_AUTHENTICATION_API;
    if(api === undefined) {
      if(process.env.NODE_ENV === "development") console.log("REACT_APP_AUTHENTICATION_API has not been set in environment.");
      return;
    }
    const uri = `${api}/pages/`;
    const fetchResult = await fetch(uri, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        "Authorization": (session?.token !== undefined) ? session?.token : ""
      },
      body: JSON.stringify({
        page: page
      })
    });
    const response = await fetchResult.json();
    if(process.env.NODE_ENV === "development") console.log(response);
    if(response.result === "success") {
      setSelectedComponent("table");
      getPagesByDomain()
      setMessage({ type: "Success", message: `${t("pages.update-success-message")}`});
    } else {
      setMessage({ type: "Error", message: `${t("pages.update-error-message")}`});
    }
  }

  const deletePage = async (session: SessionDTO, page: PagesDTO) => {
    const api = process.env.REACT_APP_AUTHENTICATION_API;
    if(api === undefined) {
      if(process.env.NODE_ENV === "development") console.log("REACT_APP_AUTHENTICATION_API has not been set in environment.");
      return;
    }
    const uri = `${api}/pages/${page._id}`;
    page.name = markdownDocument.header;
    page.markdown = markdownDocument.markdown;
    const fetchResult = await fetch(uri, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        "Authorization": (session?.token !== undefined) ? session?.token : ""
      }
    });
    const response = await fetchResult.json();
    if(process.env.NODE_ENV === "development") console.log(response);
    if(response.result === "success") {
      getPagesByDomain();
      setSelectedComponent("table");
      setMessage({ type: "Success", message: `${t("pages.delete.success-message")}`});
    } else {
      setMessage({ type: "Error", message: `${t("pages.delete.error-message")}`});
    }
  }

  useEffect(getPagesByDomain, [addPageModalOpen]);

  const movePageUp = async (index: number, pages: PagesDTO[]) => {
    if(index <= 0) {
      setMessage({ type: "Success", message: `${t("pages.page-is-already-first-page")}`});
      return;
    }
    let moveUpPage = pages[index];
    let moveDownPage = pages[index-1];
    if(moveUpPage.order == undefined) {
      return;
    }
    if(moveDownPage.order == undefined) {
      return;
    }
    moveUpPage.order = moveUpPage.order - 1;
    moveDownPage.order = moveDownPage.order + 1;
    await updatePage(props.session, moveUpPage);
    await updatePage(props.session, moveDownPage);
  }

  function movePageDown(index: number, pages: PagesDTO[]) {
    movePageUp(index + 1, pages);
  }

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
          <Flex className='flex-table'>
              <TableBuilder headers={["ORDER", "NAME", "URL", "ICON", "DOMAIN", "CONTENT", "DELETE"]} 
                rows={(pages !== undefined) ? pages.map((page, index, pages) => ({
                  _id: (page._id !== undefined) ? page._id : "",
                  selected: (selectedLine === page._id),
                  data: {
                    order: <>
                      <Button style={{ marginRight: "1rem" }} onClick={() => {
                        movePageUp(index, pages);
                      }}><Icons icon={'arrow-up'} type={'outline'} style={{ width: "16px"}}/></Button>
                      {page.order}
                      <Button style={{ marginLeft: "1rem" }} onClick={() => {
                        movePageDown(index, pages);
                      }}><Icons icon={'arrow-down'} type={'outline'} style={{ width: "16px"}}/></Button>
                    </>,
                    name: page.name,
                    link: page.link,
                    icon: <Icons icon={(page.icon !== undefined) ? page.icon : ""} type={'outline'} style={{ width: "24px"}}></Icons>,
                    domain: page.domain,
                    modify: <Button onClick={() => {
                      // TODO: Delete page.
                      setSelectedPage(page);
                      setMarkdownDocument({ header: page.name, markdown: page.markdown})
                      setSelectedComponent("editor");
                    }}>{t("pages.modify-page-button")}</Button>,
                    delete: <Button onClick={() => {
                      // TODO: Delete page.
                      deletePage(props.session, page);
                    }}>{t("pages.delete-page-button")}</Button>
                  },
                  onClick: () => {
                    setSelectedLine((page._id !== undefined) ? page._id: "");
                  }
                })
                ): []
              } 
            />
            {(message.type !== "") && <Message type={message.type} message={message.message}></Message>}
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
          markdownDocument={markdownDocument}
          setMarkdownDocument={setMarkdownDocument}
          actions={
            <Grid className='editor-actions'>
              {(message.type == "Error") && <Message type={message.type} message={message.message}></Message>}
              <Grid className='editor-buttons'>
                <Button onClick={() => {
                    setSelectedComponent("table");
                  }}>
                  {t("pages.editor.back-button")}
                </Button>
                <Button onClick={() => { 
                    updatePageMarkdown(props.session, selectedPage, markdownDocument); 
                  }}>
                  {t("pages.editor.save-button")}
                </Button>
              </Grid>
            </Grid>
          }
        /> 
      </Flex>
    }
    { addPageModalOpen === true && <AddPageModal setShowModal={setAddPageModalOpen} session={props.session}></AddPageModal> }
    </>
    
  );
} 