import axios from "axios";
import * as config from '../config/api-config';

const authData  = JSON.parse(localStorage.getItem('USER_AUTH'));
const authToken = authData == null ? null : authData.accessToken
axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

export const postCadastrarBlob = (data) => {
    return axios.post(
        config.getApiUrl() + '/Noticias', data)
        .then(
        response => { return response.data; }
    )
}

export const getBlobs = (data) => {
    return axios.get(config.getApiUrl() + '/Noticias', data)
        .then(
            response => { return response.data; }
        )
}

export const getNoticiaId = (id) => {
    return axios.get (`${config.getApiUrl()}/Noticias/${id}` )
    .then(
        response =>{
            return response.data;
        }
    )
}

// export const getNoticiaId = (id,data) => {
//     return axios.get(config.getApiUrl() + '/Noticias' +id  , data)
//         .then(
//             response => { return response.data; }
//         )
//     }



// export const postBlobs(formData) => {
//     return axios.post(config.getApiUrl() + '/Blobs/', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   })} ;


// export async function postBlobs(formData) {
//   try {
//     const response = await axios.post(config.getApiUrl() + '/Blobs/', formData, headers) 
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

