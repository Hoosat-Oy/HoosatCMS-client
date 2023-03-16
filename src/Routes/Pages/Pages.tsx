import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SessionDTO } from '../../@types';
import { AddPageModal } from '../../Components/AddPageModal/AddPageModal';
import { Button, Grid, GridItem, Heading, List, ListItem, PageBuilder } from '../../HoosatUI/src';

import "./Pages.scss";

interface PagesProps {
  session: SessionDTO;
}

export const Pages: React.FC<PagesProps> = (props: PagesProps) => {
  const [ t, i18n ] = useTranslation();
  const [ addPageModalOpen, setAddPageModalOpen ] = useState(false);
  return (
    <>
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
        content={<>content</>}
      />
      { addPageModalOpen === true && <AddPageModal setShowModal={setAddPageModalOpen} session={props.session}></AddPageModal> }
      
    </>
    
  );
} 