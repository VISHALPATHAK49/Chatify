import styled from "styled-components"
import {useRouter} from "next/router"
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import {useCollection} from "react-firebase-hooks/firestore";
import { auth,db } from '../firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import InsertEmoticonIcon  from "@material-ui/icons/InsertEmoticon";
import MicIcon  from "@material-ui/icons/Mic";
import React,{useState,useRef} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Message from './Message';
import getRecipientEmail from "../utils/getRecipientEmail"
import TimeAgo from "timeago-react";
function ChatScreen({chat,messages}) {
    const [user]=useAuthState(auth);
    const [input,setInput]=useState("");
    const endOfMessageRef=useRef(null);
    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection("users").doc(user.uid).set({
            lastSeen:firebase.firestore.FieldValue.serverTimestamp(),

        },{merge:true});
        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user.email,
            photoURL:user.photoURL,
        })
        setInput("");
        scrollToBottom();
    };
    const router=useRouter();
    const scrollToBottom=()=>{
        endOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block:"start",
        });
    }
    const [messagesSnapshot]=useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'));
    const showMessages=()=>{
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message=>(
                <Message key={message.id} user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        }else{
            return JSON.parse(messages).map(message=>{
            <Message key={message.id} user={message.user} message={message} />
            })
        }
    };
    const recipientEmail=getRecipientEmail(chat.users,user);
    const [recipientSnapshot] =useCollection(
        db.collection("users")
        .where("email","==",getRecipientEmail(chat.users,user))
    );
    const recipient=recipientSnapshot?.docs?.[0]?.data();
  return (
    <Container>
        <Header>
        {recipient?(
            <Avatar src={recipient?.photoURL}/>
        ):(
            <Avatar>{recipientEmail[0]}</Avatar>
        )}
            <HeaderInformation>
                <h3>{recipientEmail}</h3>
                {recipientSnapshot?(
                    <p>Last Active: {" "}
                    {recipient?.lastSeen?.toDate()?(
                        <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                     ) :("Unavailable" )}
                    </p>
                ):(
                    <p>Loading...</p>
                )}
            </HeaderInformation>
            <HeaderIcons>
                <IconButton>
                <AttachFileIcon/>
                </IconButton>

                <IconButton>
                <MoreVertIcon/>
                </IconButton>
            </HeaderIcons>
        </Header>
        <MessageContainer>
            {showMessages()}
            <EndOfMessage ref={endOfMessageRef}/>
        </MessageContainer>
        <InputContainer>
            <InsertEmoticonIcon/>
            <Input value={input} onChange={e=>setInput(e.target.value)}/>
            <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send</button>
            <IconButton>
            <MicIcon/>
            </IconButton>
        </InputContainer>
    </Container>
  )
}

export default ChatScreen
const Container= styled.div`
`;
const InputContainer= styled.form`
    display: flex;
    align-items: center;
    padding: 15px;
    position: sticky;
    background-color: #fff;
    z-index: 100;
    bottom:0;
`;
const Input= styled.input`
    flex:1;
    outline: 0;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    padding: 20px;
    align-items: center;
    margin: 0 15px 0 15px;
`;
const Header= styled.div`
    position: sticky;
    background-color:#fff;
    padding: 11px;
    display: flex;
    z-index:100;
    align-items: center;
    height:80px;
    border-bottom: 1px solid whitesmoke;
  
`;
const HeaderInformation= styled.div`
    margin-left:15px;
    flex:1;
    >h3{
        margin-bottom: 3px;
    }
    >p{
        font-size:14px;
        color:gray;
    }
`;
const HeaderIcons=styled.div``;
const EndOfMessage= styled.div`
    margin-bottom: 50px;
`;
const MessageContainer= styled.div`
    padding: 30px;
    background-color:#e5ded8;
    min-height: 90vh;
`;
