import React, { useState } from 'react';
import { FormBuilder } from '../../HoosatUI';
import { useTranslation } from 'react-i18next';
import { PageDTO, SessionDTO } from '../../@types';
import { iconNames } from '../../HoosatUI/src/Icons/Icons';
import { CreatePage } from '../../Controllers/Pages';

interface AddPageProps {
  session: SessionDTO;
  closeComponent: () => void;
}

export const AddPage: React.FC<AddPageProps> = (props: AddPageProps) => {
  const [ t, i18n ] = useTranslation();
  const [ page, setPage ] = useState<PageDTO>({
    _id: "",
    group: "",
    author: "",
    name: "",
    link: "/index",
    markdown: "",
    icon: "",
    domain: ""
  });
  return (
    <FormBuilder 
      submitbuttontext={`${t('pages.add.submit-button')}`} 
      inputs={[
        {
          itype: "input",
          id: "name",
          label: `${t('pages.add.name-input')}`,
          type: "text",
          onChange: (e: React.BaseSyntheticEvent) => {
            setPage({
              ...page,
              name: e.target.value,
              link: "/" + encodeURI(e.target.value.replaceAll(".", ""))
            });
          },
          value: page.name
        },
        {
          itype: "combobox",
          id: "icon",
          label: `${t('pages.add.icon-combobox')}`,
          options: iconNames,
          multiple: false,
          search: true,
          onSelect: (e: React.BaseSyntheticEvent) => {
            setPage({
              ...page,
              icon: e.target.value
            });
          },
          value: page.icon
        },
        {
          itype: "input",
          id: "link",
          label: `${t('pages.add.link-input')}`,
          type: "text",
          onChange: (e: React.BaseSyntheticEvent) => {
            setPage({
              ...page,
              link: e.target.value
            });
          },
          value: page.link
        }
      ]} 
      onSubmit={async () => { 
        if(await CreatePage(props.session, page) === true) {
          props.closeComponent(); 
        }
      }} 
    />
  );
}