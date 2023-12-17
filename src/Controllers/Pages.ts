import { PageDTO, SessionDTO } from "../@types";

export const CreatePage = async (session: SessionDTO, page: PageDTO) => {
  page.domain = window.location.hostname;
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return;
  }
  const uri = `/api/pages/`;
  const fetchResult = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      "Authorization": session.token
    },
    body: JSON.stringify({
      page: page
    })
  });
  const response = await fetchResult.json();
  if(process.env.NODE_ENV === "development") console.log(response);
  if(response.result === "success") {
    // TODO: Handle success creating page and errors!
    return true;
  } else {
    return false;
  }
}
export const GetPagesByDomain = async (session: SessionDTO, ) => {
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return;
  }
  const uri = `/api/pages/domain/${window.location.hostname}`;
  const fetchResult = await fetch(uri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    }
  });
  const response = await fetchResult.json();
  if(process.env.NODE_ENV === "development") console.log(response);
  if(response.result === "success") {
    return response.pages;
  } else {
    return false;
  }
}

export const UpdatePage = async (session: SessionDTO, page: PageDTO) => {
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return;
  }
  const uri = `/api/pages/`;
  const fetchResult = await fetch(uri, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      "Authorization": (session?.token !== undefined) ? session?.token : ""
    },
    body: JSON.stringify({
      page: page
    })
  });
  const response = await fetchResult.json();
  if(process.env.NODE_ENV === "development") console.log(response);
  if(response.result === "success") {
    return true;
  } else {
    return false;
  }
}

export const DeletePage = async (session: SessionDTO, page: PageDTO) => {
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return;
  }
  const uri = `/api/pages/${page._id}`;
  const fetchResult = await fetch(uri, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      "Authorization": (session?.token !== undefined) ? session?.token : ""
    }
  });
  const response = await fetchResult.json();
  if(process.env.NODE_ENV === "development") console.log(response);
  if(response.result === "success") {
    return true;
  } else {
    return false;
  }
}

export const MovePageUp = async (session: SessionDTO, index: number, pages: PageDTO[]) => {
  if(index <= 0) {
    return false;
  }
  let moveUpPage = pages[index];
  let moveDownPage = pages[index-1];
  if(moveUpPage.order == undefined) {
    return false;
  }
  if(moveDownPage.order == undefined) {
    return false;
  }
  moveUpPage.order = moveUpPage.order - 1;
  moveDownPage.order = moveDownPage.order + 1;
  pages[index] = moveDownPage;
  pages[index-1] = moveUpPage;
  await UpdatePage(session, moveUpPage);
  await UpdatePage(session, moveDownPage);
  return true;
}


export const MovePageDown = async (session: SessionDTO, index: number, pages: PageDTO[]) => {
  return await MovePageUp(session, index + 1, pages);
}