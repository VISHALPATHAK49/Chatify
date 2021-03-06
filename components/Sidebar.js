import styled from 'styled-components'
import {Avatar, Button, IconButton} from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import { auth,db } from '../firebase';
import Chat from './Chat'
function Sidebar() {
  const[user]=useAuthState(auth);
  const userChatref=db.collection('chats').where('users','array-contains',user.email);
  const [chatsSnapshot]=useCollection(userChatref);
  const createChat=()=>{
    const input=prompt("Please enter an email adress for the user you want to chat with");
    if(!input)return null;
    
    if(EmailValidator.validate(input)&& !chatExists(input)&& input!==user.email){
      // add chat 
      db.collection('chats').add({
        users:[user.email,input]
      })
    }
  };
  const chatExists=(recipientEmail)=>
   !!chatsSnapshot?.docs.find(chat=>chat.data().users.find((user)=>user===recipientEmail)?.length>0
   );
  return (
    <Container>
        <Header>
           <UserAvatar onClick={()=>auth.signOut()} src={user.photoURL}/>
           <IconsContainer>
             <IconButton>
             <ChatIcon/>
             </IconButton>
             <IconButton>
             <MoreVertIcon/>
             </IconButton>
              
           </IconsContainer>
        </Header>
        <Search>
          <SearchIcon />
          <SearchInput placeholder="Search in chats"/ >
        </Search>
        <SideBarButton onClick={createChat}>
          START A NEW CHAT
        </SideBarButton>
         {chatsSnapshot?.docs.map(chat=>(
           <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
         ))}
    </Container>
  )
}

export default Sidebar;
export const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 350px;
  max-width: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
  scrollbar-width: 0;
  -ms-overflow-style: none;
`;
const Header = styled.div`
  display: flex;
  position:sticky;
  top: 0;
  background-color:white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height:80px;
  border-bottom: 1px solid whitesmoke;
`;
const UserAvatar=styled(Avatar)`
  cursor: pointer;
  :hover{
    opacity: 0.8;
  }
`;
const IconsContainer= styled.div``;
const Search= styled.div`
  display:flex;
  align-items:center;
  padding: 20px;
  border-radius:2px;
`;
const SearchInput= styled.input`
  outline-width: 0;
  border: none;
  flex:1;
`;
const SideBarButton=styled(Button)`
  width:100%;
  font-weight: 800;
  &&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;