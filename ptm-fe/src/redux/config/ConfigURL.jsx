import axios from 'axios';

export const urlBackEnd = 'http://localhost:8080/ptm/api';

export const loginURL = axios.create({
    baseURL: 'http://localhost:8080/ptm'
});

export const addressURL = axios.create({
    baseURL: `${urlBackEnd}/useraddresses`
});

export const authorityURL = axios.create({
    baseURL: `${urlBackEnd}/authorities`
});

export const dashboardURL = axios.create({
    baseURL: `${urlBackEnd}/dashboard`
});

export const publicURL = axios.create({
    baseURL: `${urlBackEnd}/public`
});

export const userimageURL = axios.create({
    baseURL: `${urlBackEnd}/userimages`
});

export const userURL = axios.create({   
    baseURL: `${urlBackEnd}/users`
});

export const memberURL = axios.create({   
    baseURL: `${urlBackEnd}/members`
});

export const boardURL = axios.create({   
    baseURL: `${urlBackEnd}/boards`
});

export const boardmemberURL = axios.create({   
    baseURL: `${urlBackEnd}/boardmembers`
});

export const categoryURL = axios.create({   
    baseURL: `${urlBackEnd}/categories`
});

export const memberaddressURL = axios.create({   
    baseURL: `${urlBackEnd}/memberaddresses`
});

export const membercontactURL = axios.create({   
    baseURL: `${urlBackEnd}/membercontacts`
});

export const roleURL = axios.create({   
    baseURL: `${urlBackEnd}/roles`
});