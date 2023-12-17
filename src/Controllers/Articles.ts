import { ArticleDTO, SessionDTO } from "../@types";

export const CreatePost = async (session: SessionDTO, article: ArticleDTO) => {
  article.domain = window.location.hostname;
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return;
  }
  const uri = `/api/articles/`;
  const fetchResult = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      "Authorization": session.token
    },
    body: JSON.stringify({
      article: article
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

export const UpdatePost = async (session: SessionDTO, article: ArticleDTO) => {
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return;
  }
  const uri = `/api/articles/`;
  const fetchResult = await fetch(uri, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      "Authorization": session.token
    },
    body: JSON.stringify({
      article: article
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

export const PublishPost = async (session: SessionDTO, article: ArticleDTO) => {
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return;
  }
  const uri = `/api/articles/publish`;
  const fetchResult = await fetch(uri, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      "Authorization": session.token
    },
    body: JSON.stringify({
      article: article
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

export const UnpublishPost = async (session: SessionDTO, article: ArticleDTO) => {
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return;
  }
  const uri = `/api/articles/unpublish`;
  const fetchResult = await fetch(uri, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      "Authorization": session.token
    },
    body: JSON.stringify({
      article: article
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


export const DeletePost = async (session: SessionDTO, article: ArticleDTO) => {
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return;
  }
  const uri = `/api/articles/${article._id}`;
  const fetchResult = await fetch(uri, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      "Authorization": session.token
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

export const GetPostsByDomain = async (session: SessionDTO): Promise<ArticleDTO[]> => {
  if(session.token === undefined) {
    if(process.env.NODE_ENV === "development") console.log("session.token was undefined, can not continue creating page.");
    return {} as ArticleDTO[];
  }
  const uri = `/api/articles/domain/${window.location.hostname}`;
  const fetchResult = await fetch(uri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      "Authorization": session.token
    }
  });
  const response = await fetchResult.json();
  if(process.env.NODE_ENV === "development") console.log(response);
  if(response.result === "success") {
    return response.articles;
  } else {
    return {} as ArticleDTO[];
  }
}