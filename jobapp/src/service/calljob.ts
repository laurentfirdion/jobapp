import Job from '../model/job';
import axios from 'axios';
import {AxiosResponse} from "axios";

export default class CallJob {
    private url: string = 'https://jobs.github.com/positions';

    getJob(): Promise<AxiosResponse<Job[]>> {
        return axios.get(this.url + '.json?description=&location=');
    }

    getJobBySearch(job: string, city: string): Promise<AxiosResponse<Job[]>> {
        return axios.get(this.url + '.json?description='+ job +'&location=' + city);
    }
    getDetailJob(id: string): Promise<AxiosResponse<Job>> {
        return axios.get(this.url + '/'+ id +'.json');
    }
}