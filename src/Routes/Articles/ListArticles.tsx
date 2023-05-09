import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleDTO, SessionDTO } from '../../@types';
import { Button, TableBuilder } from '../../HoosatUI';
import { DeletePost, GetPostsByDomain, PublishPost, UnpublishPost, UpdatePost } from '../../Controllers/Articles';

interface ListArticlesProps {
  session: SessionDTO;
  openEditor: (page: ArticleDTO) => void;
}

export const ListArticles: React.FC<ListArticlesProps> = (props: ListArticlesProps) => {
  const [ t, i18n] = useTranslation();
  const [ posts, setPosts ] = useState<ArticleDTO[]>([]);
  const [ selectedPost, setSelectedPost ] = useState<ArticleDTO>({
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
            publishedAt: (post.publishedAt && new Date(post.publishedAt).getFullYear() !== 1970) ? (new Date(post.publishedAt)).toLocaleString() : "NOT PUBLISHED",
            updated: (post.updatedAt) ? (new Date(post.updatedAt)).toLocaleString() : "",
            created: (post.createdAt) ? (new Date(post.createdAt)).toLocaleString() : "",
            content: 
              <Button onClick={() => {
                setSelectedPost(post);
                props.openEditor(post);
              }}>{t("posts.modify-button")}</Button>,
            publish: 
              (post.publish === false)
              ? <Button onClick={async () => {
                  await PublishPost(props.session, {
                    ...post,
                    publish: true,
                  });
                  setUpdate(!update);
                }}>{t("posts.publish-button")}</Button>
              : (post.publish === true)
              ? <Button onClick={async () => {
                  await UnpublishPost(props.session, {
                    ...post,
                    publish: false,
                  });
                  setUpdate(!update);
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