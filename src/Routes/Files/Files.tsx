import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageDTO, SessionDTO } from '../../@types';
import { Button, Grid, Heading, List, ListItem, PageBuilder } from '../../../../HoosatUI';

import "./Files.css";
import { AddFile } from './AddFile';

interface FilesProps {
  session: SessionDTO;
}

export const Files: React.FC<FilesProps> = (props: FilesProps) => {
  const [ t, ] = useTranslation();
  const [ currentComponent, setCurrentComponent] = useState<string>("files.add");
  

  return (
    <PageBuilder className='files' 
      header={
        <Heading variant="h1">{t("files.header")}</Heading>
      }
      navigation={
        <List>
          <ListItem>
            <Button onClick={() => { setCurrentComponent("files.list") }}>{t("files.list-button")}</Button>
          </ListItem>
          <ListItem>
            <Button onClick={() => { setCurrentComponent("files.add") }}>{t("files.add-button")}</Button>
          </ListItem>
        </List>
      }
      body={
        (currentComponent === "files.add") 
        ? <AddFile 
            session={props.session} 
            closeComponent={() => {
              setCurrentComponent("files.list")
            }}
          />
        : <></>       
      }
    />
  );
} 