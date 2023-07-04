import React from 'react';
import { Link } from 'react-router-dom';
import {  List, ListItem, Image, Icon } from '../../../../HoosatUI';

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
          <Icon name="at-symbol"  style={{ height: "1.5rem", width: "1.5rem", paddingRight: "1rem", fill: "#f5f5f5" }} />
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/hoosatcms/articles" style={{ textDecoration: "none", color: "inherit" }} title="Blogi artikkeleiden kirjoitus, muokkaaminen ja poisto." >
          <Icon name="book-reference"  style={{ height: "1.5rem", width: "1.5rem", paddingRight: "1rem", fill: "#f5f5f5" }} />
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/hoosatcms/files" style={{ textDecoration: "none", color: "inherit" }} title="Blogin tiedostojen hallinta." >
          <Icon name="document"  style={{ height: "1.5rem", width: "1.5rem", paddingRight: "1rem", fill: "#f5f5f5" }} />
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} title="Sinun sivusi.">
          <Icon name="home"  style={{ height: "1.5rem", width: "1.5rem", paddingRight: "1rem", fill: "#f5f5f5" }} />
        </Link>
      </ListItem>
    </List>
  )
}