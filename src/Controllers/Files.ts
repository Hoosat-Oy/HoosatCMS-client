import { FilesDTO, UploadsDTO, SessionDTO } from "../@types";


export const UploadFile = async (session: SessionDTO, file: UploadsDTO) => {
  file.domain = window.location.hostname;
  if (session.token === undefined) {
    if (process.env.NODE_ENV === "development")
      console.log("session.token was undefined, cannot continue uploading files.");
    return;
  }
  const api = process.env.REACT_APP_AUTHENTICATION_API;
  if (api === undefined) {
    if (process.env.NODE_ENV === "development")
      console.log("REACT_APP_AUTHENTICATION_API has not been set in environment.");
    return;
  }
  const uri = `${api}/files/`;
  const formData = new FormData();
  file.files.forEach((file, index) => {
    formData.append(`file[${index}]`, file); // Append each file to the FormData with a unique key
  });
  const fetchResult = await fetch(uri, {
    method: "POST",
    headers: {
      Authorization: session.token
    },
    body: formData
  });
  const response = await fetchResult.json();
  if (process.env.NODE_ENV === "development") console.log(response);
  if (response.result === "success") {
    return true;
  } else {
    return false;
  }
};


export const GetFilesByDomain = async (session: SessionDTO): Promise<FilesDTO[]> => {
  const domain = window.location.hostname;
  if (session.token === undefined) {
    if (process.env.NODE_ENV === "development")
      console.log("session.token was undefined, cannot continue uploading files.");
    return [];
  }
  const api = process.env.REACT_APP_AUTHENTICATION_API;
  if (api === undefined) {
    if (process.env.NODE_ENV === "development")
      console.log("REACT_APP_AUTHENTICATION_API has not been set in environment.");
    return [];
  }
  const uri = `${api}/files/domain/${domain}`;
  const fetchResult = await fetch(uri, {
    method: "GET",
    headers: {
      Authorization: session.token
    },
  });
  const response = await fetchResult.json();
  if (process.env.NODE_ENV === "development") console.log(response);
  if (response.result === "success") {
    return response.files;
  } else {
    return [];
  }
}

export const DeleteFile = async (session: SessionDTO, file: FilesDTO): Promise<boolean> => {
  if (session.token === undefined) {
    if (process.env.NODE_ENV === "development")
      console.log("session.token was undefined, cannot continue uploading files.");
    return false;
  }
  const api = process.env.REACT_APP_AUTHENTICATION_API;
  if (api === undefined) {
    if (process.env.NODE_ENV === "development")
      console.log("REACT_APP_AUTHENTICATION_API has not been set in environment.");
    return false;
  }
  const uri = `${api}/files/${file._id}`;
  const fetchResult = await fetch(uri, {
    method: "DELETE",
    headers: {
      Authorization: session.token
    },
  });
  const response = await fetchResult.json();
  if (process.env.NODE_ENV === "development") console.log(response);
  if (response.result === "success") {
    return true;
  } else {
    return false;
  }
}
