const baseUrl = 'http://localhost:5000'

const getHeaders = () => {
    return {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };
};

export { baseUrl, getHeaders }