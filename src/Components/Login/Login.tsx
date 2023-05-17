import React, { FormHTMLAttributes, useState } from 'react';
import { Flex, FormBuilder, Heading } from '../../HoosatUI';

interface Session {
  token?: string,
  account?: string,
  method?: string,
  createdAt?: string,
  updtedAt?: string,
  authenticate: (username: string, password: string) => any
}

interface LoginProps {
  session: Session
}

export const Login: React.FC<LoginProps> = ({
  session,
  ...rest
}) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  return (
    <Flex style={{ display: "Flex", width: "100%", justifyContent: "center", alignContent: "center"}}>
      <Heading variant="h1" style={{ marginTop: "4rem"}}>HoosatCMS</Heading>
      <FormBuilder submitbuttontext="Kirjaudu" inputs={[
          { 
            itype: "input", 
            id: "email-input", 
            label: "Sähköposti",
            type: "email", 
            placeholder: "Kirjoita sähköposti.",  
            onChange: (e: React.BaseSyntheticEvent) => { setLoginForm({...loginForm, email: e.target.value }); }, 
            value: loginForm.email 
          },
          { 
            itype: "input", 
            id: "password-input", 
            label: "Salasana",
            type: "password", 
            placeholder: "Kirjoita salasana.",  
            onChange: (e: React.BaseSyntheticEvent) => { setLoginForm({...loginForm, password: e.target.value }); }, 
            value: loginForm.password 
          }
        ]}
        style={{ display: "flex", width: "100%", justifyContent: "center", alignContent: "center" }}
        onSubmit={() => { session.authenticate(loginForm.email, loginForm.password) }}
      />
    </Flex>
  );
}