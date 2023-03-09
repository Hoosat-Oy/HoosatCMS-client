import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageBuilder } from "../HoosatUI/src";
import { Login } from '../Components/Login/Login';
import { Navigation as Nav } from "../Components/Navigation/Navigation";

import './Admin.scss';

interface Session {
  token?: string,
  account?: string,
  method?: string,
  createdAt?: string,
  updtedAt?: string,
  authenticate: (username: string, password: string) => any
}

export const Admin = () => {

  const location = useLocation();

  const [session, setSession] = useState<Session>({
    authenticate: async (email: string, password: string) => {
      if(email === undefined || password === undefined) {
        return false;
      }
      const params = { email: email, password: password }
      const api = process.env.REACT_APP_AUTHENTICATION_API;
      if(api === undefined) {
        console.log("REACT_APP_AUTHENTICATION_API has not been set in environment.");
        return;
      }
      const result = await fetch(`${api}/authentication/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(params),
      });
      const response = await result.json();
      
      if(process.env.NODE_ENV === "development") console.log(response);
      if(response.result === "success") {
        if(response.session !== undefined) {
          localStorage.setItem("session", JSON.stringify(response.session));
          setSession({
            ...session,
            ...response.session,
          });
        }
      }
    }
  });

  const CheckSession = useCallback(() => {
    if(process.env.NODE_ENV === "development") console.log("Checking session");
    console.log(process.env);
    const localSession = localStorage.getItem("session");
    if (localSession === "null" || localSession === null) {
      return;
    }
    const parsedSession = JSON.parse(localSession);
    const confirmSession = async () => {
      const api = process.env.REACT_APP_AUTHENTICATION_API;
      if(api === undefined) {
        console.log("REACT_APP_AUTHENTICATION_API has not been set in environment.");
        return;
      }
      const result = await fetch(`${api}/authentication/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": parsedSession.token
        },
      });
      const response = await result.json();
      if(process.env.NODE_ENV === "development") console.log(response);
      if(response.result === "success") {
        if(response.session !== undefined && response.session !== null) {
          localStorage.setItem("session", JSON.stringify(response.session));
          setSession({
            ...session,
            ...response.session,
          });
        }
      }
    }
    confirmSession();
  }, [session])

  useEffect(() => {
    console.log(location);
  }, [location])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(CheckSession, []);
  
  return ( 
    <>
    { (session.token !== undefined) 
      ? <PageBuilder className='admin' style={{ minHeight: "100vh"}}
          navigation={<Nav></Nav>}
          content={
            (location.pathname === "/admin/") 
            ? <></>
            : <></>
          }
          footer={<div></div>} 
        />
      : <PageBuilder className='admin' style={{ minHeight: "100vh"}}
          navigation={<></>}
          content={<Login session={session}></Login>}
          footer={<></>} 
        />
    }
    </>
  )
}