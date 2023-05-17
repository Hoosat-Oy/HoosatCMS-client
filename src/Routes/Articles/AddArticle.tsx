import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleDTO, SessionDTO } from '../../@types';
import { FormBuilder } from '../../../../HoosatUI';
import { CreatePost } from '../../Controllers/Articles';

interface AddArticleProps {
  session: SessionDTO;
  closeComponent: () => void;
}

export const AddArticle: React.FC<AddArticleProps> = (props: AddArticleProps) => {
  const [ t ] = useTranslation();

  const [ post, setPost ] = useState<ArticleDTO>({
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
        label: `${t('posts.add.header')}`,
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