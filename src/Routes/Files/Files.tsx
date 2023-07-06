import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SessionDTO } from '../../@types';
import { Button, Heading, List, ListItem, PageBuilder } from '../../../../HoosatUI';

import "./Files.css";
import { AddFile } from './AddFile';
import { ListFiles } from './ListFiles';

interface FilesProps {
  session: SessionDTO;
}

export const Files: React.FC<FilesProps> = (props: FilesProps) => {
  const [ t, ] = useTranslation();
  const [ currentComponent, setCurrentComponent] = useState<string>("files.list");
  

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
        : (currentComponent === "files.list") 
        ? <ListFiles 
            session={props.session} 
          />
        : <></>       
      }
    />
  );
} 