import axios from 'axios';

const DataApi = {};

DataApi.index = async (params = null) => {
    const url = 'https://django-dev.aakscience.com/candidate_test/fronted';
    try {
        const response = await axios.get(url, { params: params });
        // console.log('response', response);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};


export default DataApi;