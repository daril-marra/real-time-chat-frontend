import { baseUrl, getHeaders } from "./backend";
import axios from "axios";

const endpoint = `${baseUrl}/api/channels`

const getChannels = async (firstname, lastname) => {
    const res = await axios.get(
        endpoint,
        getHeaders()
    );
    return res.data;
};

export { getChannels }