export const fetchImages = async (url) => {
    const responce = await axios.get(`${BASE_URL}?key=${API_KEY}&${url}`);
    return responce;
}