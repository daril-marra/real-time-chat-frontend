import { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { getChannels } from '../api/channels'

export default function ChannelList({channels, setChannels, channel, setChannel}) {

    useEffect(() => {
        const fetchData = async () => {
            const resp = await getChannels()
            setChannels(resp)
        }
        fetchData()
    }, [setChannels])

    const selectChannel = (chan) => setChannel(chan)

    return (
        <ListGroup>
            { channels.map((chan) => 
                <ListGroup.Item key={chan.id} action onClick={() => selectChannel(chan)} active={channel?.id===chan.id}> {chan.name} </ListGroup.Item>
            ) }
        </ListGroup>
    )
}
