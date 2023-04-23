import React, { useState } from 'react';
import { SessionDTO } from '../../@types';
import { Button, Flex, Heading, List, ListItem, PageBuilder } from '../../HoosatUI';
import { useTranslation } from 'react-i18next';
import { AddPost } from '../../Components/Posts/AddPost';
import { ListPosts } from '../../Components/Posts/ListPosts';

import "./Posts.css";

interface PostsProps {
  session: SessionDTO;
}



export const Posts: React.FC<PostsProps> = (props: PostsProps) => {
  const [ t, i18n ] = useTranslation();
  const [ currentComponent, setCurrentComponent] = useState<string>("posts.list");

  return (
    <PageBuilder className="posts"
      header={
        <Heading variant="h1">{t("posts.header")}</Heading>
      }
      navigation={
        <List>
          <ListItem>
            <Button onClick={() => setCurrentComponent("posts.list")}>{t("posts.list-button")}</Button>
          <ListItem>
          </ListItem>
            <Button onClick={() => setCurrentComponent("posts.add")}>{t("posts.add-button")}</Button>
          </ListItem>
        </List>
      }
      content={
        (currentComponent === "posts.add") 
        ? <AddPost 
            session={props.session} 
            closeComponent={() => {
              setCurrentComponent("posts.list")
            }}
          />
        : <ListPosts 
            session={props.session}
          />  
      }
    >
    </PageBuilder>
  )
}