import React from 'react';
import { Link } from 'react-router-dom';
import {  List, ListItem, Image } from '../../../../HoosatUI';

export const Navigation = () => {
  return (
    <List>
      <ListItem>
        <Link to="/hoosatcms/" style={{ textDecoration: "none", color: "inherit" }} title="Hoosat CMS paneelin etusivu.">
          <Image src="https://hoosat.fi/hoosat.svg" style={{ width: "24px", margin: "0px"}} alt="Hoosat Logo"></Image>
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/hoosatcms/pages" style={{ textDecoration: "none", color: "inherit" }} title="Sivujen luonti, muokkaaminen ja poisto.">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "24px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/hoosatcms/articles" style={{ textDecoration: "none", color: "inherit" }} title="Blogi artikkeleiden kirjoitus, muokkaaminen ja poisto." >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  style={{ width: "24px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} title="Sinun sivusi.">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: "24px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </Link>
      </ListItem>
    </List>
  )
}