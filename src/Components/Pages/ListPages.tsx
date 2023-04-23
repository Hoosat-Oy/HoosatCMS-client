import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid, Icons, Input, TableBuilder } from '../../HoosatUI';
import { PageDTO, SessionDTO } from '../../@types';
import { useTranslation } from 'react-i18next';
import { GetPagesByDomain, deletePage, movePageDown, movePageUp, updatePage } from '../../Controllers/Posts/Pages';

interface ListPagesProps {
  session: SessionDTO;
}

export const ListPages: React.FC<ListPagesProps> = (props: ListPagesProps) => {
  const [ t, i18n ] = useTranslation();
  const [ pages, setPages ] = useState<PageDTO[]>([]);
  const [ selectedPage, setSelectedPage ] = useState<PageDTO>({});
  const [ update, setUpdate ] = useState<boolean>(false);
  
  const getPagesByDomain = useCallback(() => {
    console.log("GetPagesByDomain useEffect called.");
    const fetchPages = async () => {
      const result = await GetPagesByDomain(props.session);
      setPages(result);
    }
    fetchPages();
  }, []);

  useEffect(getPagesByDomain, [update]);
  
  return (
    <TableBuilder headers={["ORDER", "ICON", "NAME", "URL", "UPDATE", "CONTENT", "DELETE"]} 
      rows={(pages !== undefined) ? pages.map((page, index, pages) => ({
        _id: (page._id !== undefined) ? page._id : "",
        selected: (selectedPage._id === page._id),
        data: {
          order: <Grid className='order-buttons'>
            <Button onClick={async () => {
              await movePageUp(props.session, index, pages);
              setUpdate(!update)
            }}><Icons icon={'arrow-up'} type={'outline'} style={{ width: "16px"}}/></Button>
            {page.order}
            <Button onClick={async () => {
              await movePageDown(props.session, index, pages);
              setUpdate(!update)
            }}><Icons icon={'arrow-down'} type={'outline'} style={{ width: "16px"}}/></Button>
          </Grid>,
          icon: <Icons icon={(page.icon !== undefined) ? page.icon : ""} type={'outline'} style={{ width: "24px"}}></Icons>,
          // name: page.name,
          name: <Input type="text" value={page.name} onChange={(e) => {
            setPages(pages.map((p, i) => {
              if(i === index) {
                p.name = e.target.value;
              }
              return p;
            }))
          }}/>,
          // link: page.link,
          link: <Input type="text" value={page.link} onChange={(e) => {
            setPages(pages.map((p, i) => {
              if(i === index) {
                p.link = e.target.value;
              }
              return p;
            }))
          }}/>,
          update: <Button onClick={async () => {
            await updatePage(props.session, page);
            setUpdate(!update)
          }}>{t("pages.update-page-button")}</Button>,
          modify: <Button onClick={() => {
            setSelectedPage(page);
          }}>{t("pages.modify-page-button")}</Button>,
          delete: <Button onClick={async () => {
            await deletePage(props.session, page);
            setUpdate(!update)
          }}>{t("pages.delete-page-button")}</Button>
        },
        onClick: () => {
          setSelectedPage(page);
        }
      })
      ): []
    } 
  />
  );
}