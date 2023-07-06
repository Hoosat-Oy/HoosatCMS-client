import React, { useCallback, useEffect, useState } from 'react';
import { Button, TableBuilder, Image, Icon, ImageViewer } from '../../../../HoosatUI';
import { FilesDTO, SessionDTO } from '../../@types';
import { useTranslation } from 'react-i18next';
import { DeleteFile, GetFilesByDomain } from '../../Controllers/Files';

interface ListFilesProps {
  session: SessionDTO;
  // openEditor: (file: FilesDTO) => void;
}

interface showImageDTO {
  src: string | undefined,
  alt: string | undefined,
}

export const ListFiles: React.FC<ListFilesProps> = (props: ListFilesProps) => {
  const [showImage, setShowImage] = useState<showImageDTO>({ src: undefined, alt: undefined});
  const [ t ] = useTranslation();
  const [ files, setFiles ] = useState<FilesDTO[]>([]);
  const [ selectedPage, setSelectedPage ] = useState<FilesDTO>({} as FilesDTO);
  const [ update, setUpdate ] = useState<boolean>(false);
  
  const getFilesByDomain = useCallback(() => {
    console.log("getFilesByDomain useEffect called.");
    const fetchPages = async () => {
      const result = await GetFilesByDomain(props.session);
      console.log(result);
      setFiles(result);
    }
    fetchPages();
  }, []);

  useEffect(getFilesByDomain, [update]);

  const checkIfImage = (filename: string): boolean => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff', 'ico'];
    const extension = filename.split('.').pop()?.toLowerCase();
    if (extension && imageExtensions.includes(extension)) {
      return true;
    }
    return false;
  };
  
  return (
    <>
      { (showImage.src !== undefined) && 
        <ImageViewer 
          src={showImage.src} 
          alt={showImage.alt}
          onClose={() => { setShowImage({ ...showImage, src: undefined, alt: undefined })}}
        >
        </ImageViewer>
      }
      <TableBuilder headers={["PICTURE", "FILENAME", "PUBLIC PATH", "DELETE"]} 
        rows={(files !== undefined && Array.isArray(files)) ? files.map((file, _index, _files) => ({
          _id: (file._id !== undefined) ? file._id : "",
          selected: (selectedPage._id === file._id),
          data: {
            // name: file.name,
            picture: (checkIfImage(file.newFilename!) === true) 
              ? <Image src={file.filepath?.replace("./build/public/", "/")} style={{ maxWidth: "100px", maxHeight: "100px" }} onClick={() => {
                setShowImage({ ...showImage, src: file.filepath?.replace("./build/public/", "/"), alt: file.filepath?.replace("./build/public/", "/") });
              }}></Image> 
              : <Icon name={'document'} style={{ width: "100px", height: "100px" }}></Icon>,
            filename: file.originalFilename,
            publicpath: <a href={file.filepath?.replace("./build/public/", "/")!}>{encodeURI(file.filepath?.replace("./build/public/", "/")!)}</a>,
            delete: <Button onClick={async () => {
              setSelectedPage(file);
              await DeleteFile(props.session, file);
              setUpdate(!update)
            }}>{t("files.delete-file-button")}</Button>
          },
          onClick: () => {
            setSelectedPage(file);
          }
        })
        ): []
      } 
    />
  </>
  );
}