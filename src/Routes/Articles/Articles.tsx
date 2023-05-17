import React, { useState } from 'react';
import { MarkdownDocument, ArticleDTO, SessionDTO } from '../../@types';
import { Button, Grid, Heading, List, ListItem, PageBuilder } from '../../../../HoosatUI';
import { useTranslation } from 'react-i18next';
import { AddArticle } from './AddArticle';
import { ListArticles } from './ListArticles';

import "./Articles.css";
import { MarkdownEditor } from '../../Components/MarkdownEditor/MarkdownEditor';
import { UpdatePost } from '../../Controllers/Articles';

interface ArticlesProps {
  session: SessionDTO;
}

export const Articles: React.FC<ArticlesProps> = (props: ArticlesProps) => {
  const [ t, ] = useTranslation();
  const [ currentComponent, setCurrentComponent] = useState<string>("posts.list");
  const [ currentPost, setCurrentPost ] = useState<ArticleDTO>({
    _id: "",
    group: "",
    author: "",
    header: "",
    markdown: "",
    read: 0,
    domain: "",
    publish: false,
  });
  const [ markdownDocument, setMarkdownDocument] = useState<MarkdownDocument>({
    header: "",
    markdown: "",
  });
  
  return (
    <PageBuilder className="posts"
      header={
        <Heading variant="h1">{t("posts.header")}</Heading>
      }
      navigation={
        <List>
          <ListItem>
            <Button onClick={() => setCurrentComponent("posts.list")}>{t("posts.list-button")}</Button>
          </ListItem>
          <ListItem>
            <Button onClick={() => setCurrentComponent("posts.add")}>{t("posts.add-button")}</Button>
          </ListItem>
        </List>
      }
      body={
        (currentComponent === "posts.add") 
        ? <AddArticle 
            session={props.session} 
            closeComponent={() => {
              setCurrentComponent("posts.list")
            }}
          />
        : (currentComponent === "posts.markdown") 
        ? <MarkdownEditor 
            actions={
              <Grid className='editor-actions'>
                <Button 
                  key="back-button"
                  onClick={() => {
                    setCurrentComponent("posts.list");
                  }}>
                  {t("posts.editor.back-button")}
                </Button>
                <Button 
                  key="save-button"
                  onClick={async () => { 
                    await UpdatePost(props.session, {
                      ...currentPost,
                      header: markdownDocument.header,
                      markdown: markdownDocument.markdown,
                    });
                    setCurrentComponent("posts.list");
                  }}>
                  {t("posts.editor.save-button")}
                </Button>
              </Grid>
            } 
            markdownDocument={markdownDocument}
            setMarkdownDocument={setMarkdownDocument}
          />
        : <ListArticles 
            session={props.session}
            openEditor={(post: ArticleDTO) => {
              setCurrentPost(post);
              setMarkdownDocument({ 
                header: post.header,
                markdown: post.markdown,
              });
              setCurrentComponent("posts.markdown")
            }}
          />  
      }
    >
    </PageBuilder>
  )
}