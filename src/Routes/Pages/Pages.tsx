import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SessionDTO } from '../../@types';
import { Button, Heading, List, ListItem, PageBuilder,   } from '../../HoosatUI/';

import "./Pages.css";
import { AddPage } from '../../Components/Pages/AddPage';
import { ListPages } from '../../Components/Pages/ListPages';

interface PagesProps {
  session: SessionDTO;
}

export const Pages: React.FC<PagesProps> = (props: PagesProps) => {
  console.log(window.location.hostname)
  const [ t, i18n ] = useTranslation();
  const [ currentComponent, setCurrentComponent] = useState<string>("pages.list");

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
        : <ListPages 
            session={props.session}
          />         
      }
    />
  );
} 