import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid, Icon, Input, TableBuilder, Combobox, iconNames } from '../../../../HoosatUI';
import { PageDTO, SessionDTO } from '../../@types';
import { useTranslation } from 'react-i18next';
import { GetPagesByDomain, DeletePage, MovePageDown, MovePageUp, UpdatePage } from '../../Controllers/Pages';

interface ListPagesProps {
  session: SessionDTO;
  openEditor: (page: PageDTO) => void;
}

export const ListPages: React.FC<ListPagesProps> = (props: ListPagesProps) => {
  const [ t ] = useTranslation();
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
              await MovePageUp(props.session, index, pages);
              setUpdate(!update)
            }}><Icon name='arrow-up' style={{ width: "16pt", height: "16pt", fill: "#fff"}}/></Button>
            <div style={{marginTop: "15px"}}>{page.order}</div>
            <Button onClick={async () => {
              await MovePageDown(props.session, index, pages);
              setUpdate(!update)
            }}><Icon name='arrow-down' style={{ width: "16pt", height: "16pt", fill: "#fff"}}/></Button>
          </Grid>,
          // icon: <Icon name={(page.icon !== undefined) ? page.icon : ""} style={{ width: "16pt", height: "16pt" }} />,
          icon: <div style={{ display: 'flex', alignItems: 'center', gap: "10px", justifyContent: "space-around", marginLeft: "15px", marginRight: "15px" }}>
            <Icon name={(page.icon !== undefined) ? page.icon : ""} style={{ width: "16pt", height: "16pt" }} />
            <Combobox
              id='icon'
              options={iconNames}
              multiple={false}
              search="true"
              onSelect={(e: React.BaseSyntheticEvent) => {
                setPages(pages.map((p, i) => {
                  if(i === index) {
                    p.icon = e.target.value;
                  }
                  return p;
                }))
              }} />
          </div>,
          // name: page.name,
          name: <Input type="text" value={page.name} onChange={(e: React.BaseSyntheticEvent) => {
            setPages(pages.map((p, i) => {
              if(i === index) {
                p.name = e.target.value;
              }
              return p;
            }))
          }}/>,
          // link: page.link,
          link: <Input type="text" value={page.link} onChange={(e: React.BaseSyntheticEvent) => {
            setPages(pages.map((p, i) => {
              if(i === index) {
                p.link = e.target.value;
              }
              return p;
            }))
          }}/>,
          update: <Button onClick={async () => {
            await UpdatePage(props.session, page);
            setUpdate(!update)
          }}>{t("pages.update-page-button")}</Button>,
          modify: <Button onClick={() => {
            setSelectedPage(page);
            props.openEditor(page);
          }}>{t("pages.modify-page-button")}</Button>,
          delete: <Button onClick={async () => {
            await DeletePage(props.session, page);
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