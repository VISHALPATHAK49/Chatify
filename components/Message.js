import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth,db } from '../firebase';
import moment from "moment";
function Message({user,message}) {
  const [userLoggedIn]=useAuthState(auth);

  const TypeOfMessage=user===userLoggedIn.email?Sender:Reciever;

  return (
    <Container>
        <TypeOfMessage>{message.message}
        <TimeStamp>
        {message.timestamp?moment(message.timestamp).format('LT'):"..."}
        </TimeStamp>
        </TypeOfMessage>
    </Container>
  )
}

export default Message
const Container= styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding:15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;
const Sender= styled(MessageElement)`
  margin-left: auto;
  background-color: #40DFEF;
`;
const Reciever= styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;
const TimeStamp=styled.span`
color: gray;
padding: 10px;
font-size:9px;
position: absolute;
bottom: 0;
right: 0;
text-align: right;
`;