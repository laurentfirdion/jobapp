import Vue from 'vue'
import Vuex from 'vuex'

import Favoris from '@/model/favoris'
import UserData from '@/service/user'
import { AxiosResponse } from "axios"

Vue.use(Vuex)

 const store = new Vuex.Store({
    state: {
      favoris: new Favoris()
    },
    mutations: {

      FAVORISLIST(state, newfav) {
        state.favoris = newfav
      },
      DELETEFAVORI(state, favori) {
        delete state.favoris[favori]
        return state.favoris
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
      supprFavoris({commit, state}, favori: string) {
        return new Promise((resolve) => {
          const user: UserData = new UserData()
          user.deleteFavoris(favori).then(()=> {
            commit('DELETEFAVORI', favori)
            resolve(); 
          }).catch((error) => {
            console.log(error.statusText);
          });
        })
      }
    },

  })

  export default store