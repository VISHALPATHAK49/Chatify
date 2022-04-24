import styled from "styled-components"
import {Circle} from "better-react-spinkit";
function Loading() {
  return (
    <center >
        <div>
            <img src="/Chatify.png"
                style={{marginBottom:10}}
                height={200}

            />
            <Circle color="#000" size={80}/>
        </div>
    </center>
  )
}
const center =styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
`;
export default Loading