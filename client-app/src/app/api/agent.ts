import axios, { AxiosError, AxiosResponse } from 'axios';
import { history } from '../..';
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
},(error:AxiosError)=>{
    const {status}=error.response!;
    switch(status){
        case 404:
            history.push('/notFound');
            break;
        case 400:
                history.push('/notFound');
                break;
    }
    return Promise.reject();
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details:(id:string)=>requests.get<Activity>(`/activities/${id}`),
    create:(activity:Activity)=>requests.post<void>('/activities',activity),
    update:(activity:Activity)=>requests.put<void>(`/activities/${activity.id}`,activity),
    delete:(id:string)=>requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;