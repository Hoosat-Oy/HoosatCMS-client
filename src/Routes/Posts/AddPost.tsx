import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PostDTO, SessionDTO } from '../../@types';
import { FormBuilder } from '../../HoosatUI';
import { CreatePost } from '../../Controllers/Posts/Posts';

interface AddPostProps {
  session: SessionDTO;
  closeComponent: () => void;
}

export const AddPost: React.FC<AddPostProps> = (props: AddPostProps) => {
  const [ t, i18n] = useTranslation();

  const [ post, setPost ] = useState<PostDTO>({
    _id: "",
    group: "",
    author: "",
    header: "",
    markdown: "",
    read: 0,
    domain: "",
    publish: false,
  });

  return <FormBuilder 
    submitbuttontext={`${t('posts.add.submit-button')}`} 
    inputs={[
      {
        itype: "input",
        id: "header",
        label: `${t('posts.add.form-header-label')}`,
        type: "text",
        onChange: (e: React.BaseSyntheticEvent) => {
          setPost({
            ...post,
            header: e.target.value,
          });
        },
        value: post.header
      },

    ]} 
    onSubmit={async () => { 
      if(await CreatePost(props.session, post) === true) {
        props.closeComponent(); 
      }
    }} 
  />
}