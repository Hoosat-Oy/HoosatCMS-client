import { FilesDTO, SessionDTO } from "../@types";


export const UploadFile = async (session: SessionDTO, file: FilesDTO) => {
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
