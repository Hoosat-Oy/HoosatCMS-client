import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PostDTO, SessionDTO } from '../../@types';
import { Button, Flex, FormBuilder, TableBuilder } from '../../HoosatUI';
import { CreatePost, GetPostsByDomain } from '../../Controllers/Posts/Posts';

interface ListPostsProps {
  session: SessionDTO;
}

export const ListPosts: React.FC<ListPostsProps> = (props: ListPostsProps) => {
  const [ t, i18n] = useTranslation();

  const [ posts, setPosts ] = useState<PostDTO[]>([]);
  const [ selectedPost, setSelectedPost ] = useState<PostDTO>({
    _id: "",
    group: "",
    author: "",
    header: "",
    markdown: "",
    read: 0,
    domain: "",
    publish: false,
  });

  const getPostsByDomain = useCallback(() => {
    const fetchPosts = async () => {
      const result = await GetPostsByDomain(props.session);
      setPosts(result);
    }
    fetchPosts();
  }, [])

  useEffect(getPostsByDomain, []);

  return (
    <TableBuilder 
      headers={["HEADER", "PUBLISHED", "CONTENT", "PUBLISH"]} 
      rows={
        (Array.isArray(posts)) 
        ? posts.map((post, index, posts) => ({
          _id: (post._id !== undefined) ? post._id : "",
          selected: (selectedPost._id === post._id),
          data: {
            header: post.header,
            published: (post.publish === false) ? "NOT PUBLISHED" : "PUBLISHED",
            content: <Button onClick={() => {

            }}>CONTENT MODIFY BUTTON</Button>,
            publish: <Button onClick={() => {

            }}>PUBLISH BUTTON</Button>,
          },
          onClick: () => {
            setSelectedPost(post);
          }
        }))
        :[]
      } 
    />
  )
}