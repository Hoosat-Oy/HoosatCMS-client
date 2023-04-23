import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PostDTO, SessionDTO } from '../../@types';
import { Button, TableBuilder } from '../../HoosatUI';
import { DeletePost, GetPostsByDomain } from '../../Controllers/Posts/Posts';

interface ListPostsProps {
  session: SessionDTO;
  openEditor: (page: PostDTO) => void;
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
  const [ update, setUpdate ] = useState<boolean>(false);

  const getPostsByDomain = useCallback(() => {
    const fetchPosts = async () => {
      const result = await GetPostsByDomain(props.session);
      setPosts(result);
    }
    fetchPosts();
  }, [])

  useEffect(getPostsByDomain, [update]);

  return (
    <TableBuilder 
      headers={["HEADER", "PUBLISHED", "UPDATED", "CREATED", "CONTENT", "PUBLISH", "DELETE"]} 
      rows={
        (Array.isArray(posts)) 
        ? posts.map((post, index, posts) => ({
          _id: (post._id !== undefined) ? post._id : "",
          selected: (selectedPost._id === post._id),
          data: {
            header: post.header,
            published: (post.publish === false) ? "NOT PUBLISHED" : "PUBLISHED",
            updated: (post.updatedAt) ? (new Date(post.updatedAt)).toLocaleString() : "",
            created: (post.createdAt) ? (new Date(post.createdAt)).toLocaleString() : "",
            content: 
              <Button onClick={() => {
                setSelectedPost(post);
                props.openEditor(post);
              }}>{t("posts.modify-button")}</Button>,
            publish: 
              (post.publish === false)
              ? <Button onClick={() => {

                }}>{t("posts.publish-button")}</Button>
              : (post.publish === true)
              ? <Button onClick={() => {

                }}>{t("posts.unpublish-button")}</Button>
              : <></>,
            delete:
              <Button onClick={async () => {
                await DeletePost(props.session, post);
                setUpdate(!update);
              }}>{t("posts.delete-button")}</Button>,
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