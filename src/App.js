import { useState } from 'react'
import './App.css';
import { BsPencil } from  "react-icons/bs";
import { Container, Row, Col, Navbar, Form, InputGroup } from 'react-bootstrap'
import socketClient  from "socket.io-client";
import { baseUrl } from './api/backend'
import ChannelList from './components/ChannelList';
import Channel from './components/Channel';

const socket = socketClient (baseUrl);

function App() {

  const [channels, setChannels] = useState([])
  const [channel, setChannel] = useState(null)
  const [disabledUsername, setDisabledUsername] = useState(false)
  const [username, setUsername] = useState('')
  const [messages, setMessages] = useState([])

  socket.on('message', message => { 
    const msgs =[...messages]
    msgs.push(message)
    setMessages(msgs)
  })

  const sendMsg = (msg) => {
    const message = {      
      text: msg,
      channel: channel.id,
      username: username
    }
    socket.emit('send-message', message)
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand><h1>D-RTC</h1></Navbar.Brand>
          <div>
            <InputGroup>
              <InputGroup.Text>Username: </InputGroup.Text>
              <Form.Control readOnly={disabledUsername} value={username} onChange={(elt) => setUsername(elt.target.value)}/>
              <InputGroup.Text onClick={() => setDisabledUsername(!disabledUsername) }>
                <BsPencil />
              </InputGroup.Text>
            </InputGroup>
          </div>
        </Container>
      </Navbar>
      <Container fluid className="mt-5">
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <h2 className="mb-3">Channels</h2>
            <ChannelList channels={channels} setChannels={setChannels} channel={channel} setChannel={setChannel} />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            { channel &&
              <Channel messages={messages.filter((msg) => msg.channel === channel.id )} sendMsg={sendMsg}></Channel>
            }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
