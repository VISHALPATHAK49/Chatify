import Head from "next/head";
import styled from "styled-components"
import {auth,provider}from "../firebase";
function login() {
  const signIn =()=>{
    auth.signInWithPopup(provider).catch(alert);
  }
  return (
    <Container>
        <Head>
            <title>Login</title>
        </Head>
        <LoginContainer>
          <Logo src="/Chatify.png"/>
          <LoginButton onClick={signIn}>
            Sign In With Google
          </LoginButton>
        </LoginContainer>
    </Container>
  )
}

export default login
const Container=styled.div`
  display: grid;
  place-items: center;
  height:100vh;
  background-color:whitesmoke;
`;
const LoginContainer=styled.div`
  display: flex;
  flex-direction: column;
  padding:100px;
  align-items: center;
  background-color:#fff;
  border-radius:5px;
  box-shadow: 0 4px 14px -3px rgba(0,0,0,0.7);
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
 margin-bottom:20px;
`;
const LoginButton=styled.button`
width: 150px;
height: 40px;
font-size:12px;
cursor: pointer;
border-radius: 5px;
color: white;
background-color: #000;
border: none;

`;