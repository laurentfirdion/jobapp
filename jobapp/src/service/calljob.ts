import Job from '../model/job';
import axios from 'axios';
import {AxiosResponse} from "axios";

export default class CallJob {

    getJob(): Promise<AxiosResponse<Job[]>> {
        return axios.get('https://jobs.github.com/positions.json?description=&location=');
    }

    getJobBySearch(job: string, city: string): Promise<AxiosResponse<Job[]>> {
        return axios.get('https://jobs.github.com/positions.json?description='+ job +'&location=' + city);
    }
    getDetailJob(id: string): Promise<AxiosResponse<Job>> {
        return axios.get('https://jobs.github.com/positions/'+ id +'.json');
    }
}