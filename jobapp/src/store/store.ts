import Vue from 'vue'
import Vuex from 'vuex'

import Favoris from '@/model/favoris'
import UserData from '@/service/user'
import { AxiosResponse } from "axios"

Vue.use(Vuex)


class Newobject {
  [key: string]: Favoris
}

 const store = new Vuex.Store({
    state: {
      favoris: new Favoris()
    },
    getters: {
        countFavoris: state => {
            return Object.entries(state.favoris).length
        }
    },
    mutations: {
      FAVORISLIST(state, newfav) {
        state.favoris = newfav
      },
      DELETEFAVORI(state, favori: [string,null]) {
        Vue.delete(state.favoris, favori[0])
        state.favoris = { ...state.favoris };
      },
      ADDFAVORI(state, favori) {
        const newkey: string = favori[1];
        const newfav: Favoris = favori[0];

        const newObject: Newobject = new Newobject();
        newObject[newkey] = newfav;
          
        const newlist = Object.assign({},state.favoris, newObject)
        state.favoris = newlist;
    
      }
    },
    actions: {
      getFavoris({commit}) {
        return new Promise((resolve) => {
          const user: UserData = new UserData()
          user.getFavoris().then((datafav: AxiosResponse<Favoris>)=> {
            if(datafav.data !== null) {     
                const newfav = datafav.data
                commit('FAVORISLIST', newfav)
            }
            resolve();
          }).catch((error) => {
            console.log(error.statusText);
          });
        })
       
      },
      supprFavoris({commit, state}, favori: [string,null]) {
        return new Promise((resolve) => {
          const user: UserData = new UserData()
          user.deleteFavoris(favori[0]).then(()=> {
            commit('DELETEFAVORI', favori)
            resolve(); 
          }).catch((error) => {
            console.log(error.statusText);
          });
        })
      },
      addFavoris({commit, state}, favori: Favoris) {
        return new Promise((resolve) => {
          const user: UserData = new UserData()
          user.postFavoris(favori).then((data)=> {
            const newenter = data.data.name;
            const newfav: Favoris = new Favoris;

            newfav.id = favori.id;
            newfav.company = favori.company;
            newfav.date = favori.date;
            newfav.location = favori.location;
            newfav.title = favori.title;
            commit('ADDFAVORI', [newfav,newenter])
            resolve();  
          }).catch((error) => {
            console.log(error.statusText);
          });
        })
      }
    },

  })

  export default store