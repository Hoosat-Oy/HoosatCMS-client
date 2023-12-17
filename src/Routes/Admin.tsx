import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageBuilder } from "../../../HoosatUI";
import { Login } from '../Components/Login/Login';
import { Navigation as Nav } from "../Components/Navigation/Navigation";

import './Admin.css';
import { Pages } from './Pages/Pages';
import { SessionDTO } from '../@types';
import { Articles } from './Articles/Articles';
import { Files } from './Files/Files';



export const Admin = () => {

  const location = useLocation();

  const [session, setSession] = useState<SessionDTO>({
    authenticate: async (email: string, password: string) => {
      if(email === undefined || password === undefined) {
        return false;
      }
      const params = { email: email, password: password }
      const result = await fetch(`/api/authentication/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Accept': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({
          credentials: params
        }),
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
      } else {
        console.log(response.message.message)
      }
      return true;
    }
  });

  const CheckSession = useCallback(() => {
    if(process.env.NODE_ENV === "development") console.log("Checking session");
    const localSession = localStorage.getItem("session");
    if (localSession === "null" || localSession === null) {
      return;
    }
    const parsedSession = JSON.parse(localSession);
    const confirmSession = async () => {
      const result = await fetch(`/api/authentication/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Accept': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
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
          body={
            (location.pathname === "/hoosatcms/pages") 
            ? <Pages session={session}></Pages>
            : (location.pathname === "/hoosatcms/articles")
            ? <Articles session={session}></Articles>
            : (location.pathname === "/hoosatcms/files")
            ? <Files session={session}></Files>
            : <></>
          }
          footer={<div></div>} 
        />
      : <PageBuilder className='admin' style={{ minHeight: "100vh"}}
          navigation={<></>}
          body={<Login session={session}></Login>}
          footer={<></>} 
        />
    }
    </>
  )
}