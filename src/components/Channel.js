import { useState } from 'react'
import { Container, InputGroup, Form, Row } from 'react-bootstrap'
import { MdSend } from  "react-icons/md";

export default function Channel( { messages, sendMsg } ) {

    const [msg, setMsg] = useState('')

    const onSendMsg = () => {
        sendMsg(msg)
        setMsg('')
    }

    //sends message when pressing enter
    const onKeyPress = (event) => {
        if (event.charCode === 13) {
            onSendMsg()
          }
    }

    return (
        <Container>
            { messages.map((message) => {
                return (
                    <Row key={message.id}>
                        <strong>{message.username}:</strong> {message.text}
                        <hr/>
                    </Row>
                )
            })}
            <Row className="fixed-bottom">
                <InputGroup>
                <Form.Control value={msg} onChange={(elt) => setMsg(elt.target.value)} onKeyPress={onKeyPress}/>
                <InputGroup.Text onClick={() => onSendMsg() }>
                    <MdSend />
                </InputGroup.Text>
                </InputGroup>
            </Row>
        </Container>
    )
}
