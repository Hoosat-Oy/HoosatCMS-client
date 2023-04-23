import { PostDTO, SessionDTO } from "../../@types";

export const CreatePost = async (session: SessionDTO, post: PostDTO) => {
  post.domain = window.location.hostname;
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return;
  }
  const api = process.env.REACT_APP_AUTHENTICATION_API;
  if(api === undefined) {
    if(process.env.NODE_ENV === "development") console.log("REACT_APP_AUTHENTICATION_API has not been set in environment.");
    return;
  }
  const uri = `${api}/articles/`;
  const fetchResult = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      "Access-Control-Allow-Origin": "http://localhost:3000",
      'Access-Control-Allow-Credentials': 'true',
      "Authorization": session.token
    },
    body: JSON.stringify({
      article: post
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

export const UpdatePost = () => {

}

export const GetPostsByDomain = async (session: SessionDTO) => {
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return;
  }
  const api = process.env.REACT_APP_AUTHENTICATION_API;
  if(api === undefined) {
    if(process.env.NODE_ENV === "development") console.log("REACT_APP_AUTHENTICATION_API has not been set in environment.");
    return;
  }
  const uri = `${api}/articles/domain/${window.location.hostname}`;
  const fetchResult = await fetch(uri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      "Access-Control-Allow-Origin": "http://localhost:3000",
      'Access-Control-Allow-Credentials': 'true',
      "Authorization": session.token
    }
  });
  const response = await fetchResult.json();
  if(process.env.NODE_ENV === "development") console.log(response);
  if(response.result === "success") {
    return response.articles;
  } else {
    return false;
  }
}