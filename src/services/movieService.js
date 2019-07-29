import { API_URL } from '../utils/apiConfig';
import { fetchRequest } from '../utils/fetchRequest';

export const movieService = {
    getList,
    getDetail,
};

function getDetail(dataParam) {
    const data = {
        id: dataParam
    };

    return fetchRequest.fetchGet(API_URL.movieDetail, data);
}

function getList() {

    return fetchRequest.fetchGet(API_URL.movies, {});
}