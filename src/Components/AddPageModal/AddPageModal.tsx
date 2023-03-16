import { TFunction } from 'i18next';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PagesDTO, SessionDTO } from '../../@types';
import { Button, FormBuilder, InputBuilder, Message, Modal, ModalBody, ModalFooter, ModalHeader } from '../../HoosatUI';
import { iconNames } from '../Icons/Icons';

import "./AddPageModal.scss";


interface AddPageModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>
  session: SessionDTO;
}

interface CreatePageProps {
  session: SessionDTO;
  page: PagesDTO;
  setMsg: React.Dispatch<React.SetStateAction<{ message: string; type: string; }>>;
  t: TFunction<"translation", undefined, "translation">;
}

const createPage = async ({ session, page, setMsg, t }: CreatePageProps) => {
  page.domain = window.location.hostname;
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return;
  }
  const api = process.env.REACT_APP_AUTHENTICATION_API;
  if(api === undefined) {
    if(process.env.NODE_ENV === "development") console.log("REACT_APP_AUTHENTICATION_API has not been set in environment.");
    return;
  }
  const uri = `${api}/pages/`;
  const fetchResult = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      "Access-Control-Allow-Origin": "http://localhost:3000",
      'Access-Control-Allow-Credentials': 'true',
      "Authorization": session.token
    },
    body: JSON.stringify({
      page: page
    })
  });
  const response = await fetchResult.json();
  if(process.env.NODE_ENV === "development") console.log(response);
  if(response.result === "success") {
    // TODO: Handle success creating page and errors!
    setMsg({
      message: `${t("pages.add-page-modal.success-message")}`,
      type: "Success",
    });
  } else {
    setMsg({
      message: `${t("pages.add-page-modal.error-message")}`,
      type: "Error",
    });
  }
}

export const AddPageModal: React.FC<AddPageModalProps> = ({ setShowModal, session }) => {
  const [ t, i18n ] = useTranslation();
  const [ page, setPage ] = useState<PagesDTO>({
    _id: "",
    group: "",
    author: "",
    name: "",
    link: "",
    markdown: "",
    icon: "",
    domain: ""
  });

  const [ msg, setMsg ] = useState({
    message: "",
    type: ""
  })

  return (
    <Modal>
      <ModalHeader header={`${t("pages.add-page-modal.header")}`} onClick={() => setShowModal(false) }></ModalHeader>
      <ModalBody>
        <FormBuilder 
          inputs={[
            {
              itype: "input",
              id: "name",
              label: `${t('pages.add-page-modal.name-input')}`,
              type: "text",
              onChange: (e: React.BaseSyntheticEvent) => {
                setPage({
                  ...page,
                  name: e.target.value
                });
              },
              value: page.name
            },
            {
              itype: "combobox",
              id: "icon",
              label: `${t('pages.add-page-modal.icon-combobox')}`,
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
              label: `${t('pages.add-page-modal.link-input')}`,
              type: "text",
              onChange: (e: React.BaseSyntheticEvent) => {
                setPage({
                  ...page,
                  link: e.target.value
                });
              },
              value: page.link
            },
            {
              itype: "textarea",
              id: "markdown",
              label: `${t('pages.add-page-modal.markdown-textarea')}`,
              onChange: (e: React.BaseSyntheticEvent) => {
                setPage({
                  ...page,
                  markdown: e.target.value
                });
              },
              value: page.markdown
            }
          ]} submitbuttontext={`${t('pages.add-page-modal.submit-button')}`} onSubmit={() => { createPage({session, page, setMsg, t})}} />
          {msg.message !== "" && <Message message={msg.message} type={msg.type} />}
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setShowModal(false)}>{t("pages.add-page-modal.close")}</Button>
      </ModalFooter>
    </Modal>
  );
}