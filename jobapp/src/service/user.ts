import Favoris from '../model/favoris';
import axios from 'axios';
import {AxiosResponse} from "axios";

class AddFavorisTypeReturn {
    name: string;
  }

export default class UserData {

    getFavoris(): Promise<AxiosResponse<Favoris>> {
        return axios.get('https://jobapp-5f708.firebaseio.com/favoris.json');
    }
    postFavoris(favoris: Favoris): Promise<AxiosResponse<AddFavorisTypeReturn>> {
        return axios.post('https://jobapp-5f708.firebaseio.com/favoris.json', favoris)
    }
    deleteFavoris(favoris: string): Promise<AxiosResponse<null>> {
        return axios.delete('https://jobapp-5f708.firebaseio.com/favoris/'+favoris+'.json')
    }

}