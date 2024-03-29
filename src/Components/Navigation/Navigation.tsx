import React from 'react';
import { Link } from 'react-router-dom';
import {  List, ListItem, Image, Icon } from '../../../../HoosatUI';


import './Navigation.css'

export const Navigation = () => {
  return (
    <List>
      <ListItem>
        <Link to="/hoosatcms/" style={{ textDecoration: "none", color: "inherit" }} title="Hoosat CMS paneelin etusivu.">
          <Image className="logo" src="https://hoosat.fi/hoosat.svg"  alt="Hoosat Logo"></Image>
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/hoosatcms/pages" style={{ textDecoration: "none", color: "inherit" }} title="Sivujen luonti, muokkaaminen ja poisto.">
          <Icon className="icon" name="at-symbol" />
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/hoosatcms/articles" style={{ textDecoration: "none", color: "inherit" }} title="Blogi artikkeleiden kirjoitus, muokkaaminen ja poisto." >
          <Icon className="icon" name="book-reference" />
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/hoosatcms/files" style={{ textDecoration: "none", color: "inherit" }} title="Blogin tiedostojen hallinta." >
          <Icon className="icon" name="document" />
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} title="Sinun sivusi.">
          <Icon className="icon" name="home" />
        </Link>
      </ListItem>
    </List>
  )
}