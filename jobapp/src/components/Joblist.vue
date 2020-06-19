<template>
  <div>
     <b-row>
        <b-col col lg="3">
          <p>Recherche</p>
          <Search v-on:search="callSearch($event)" />
          <FavorisList v-bind:favorItems="favoris" v-bind:supprFavori="supprFavori" :key="favoriskey" />
        </b-col>
        <b-col col lg="9" class="serp">
            <h1 v-if="titleNb >= 0">{{titleNb}} offre{{titleNb > 1 ? "s" : ""}} d'emploi aujourd'hui</h1>
            <h1 v-else>Plein d'offres d'emploi aujourd'hui</h1>
           
            <div class="tags" v-if="jobdescription !== '' || location !== ''">
                <p>
                  Votre recherche :
                </p>
                <Tag v-bind:tagname="jobdescription" />
                <Tag v-bind:tagname="location" />
            </div>
            <div v-else>
              <p>dans le monde, commencez à chercher !</p>
            </div> 
            <div class="serp" v-if="Object.keys(joblist).length">
              <Jobitem v-for="jobitem in joblist" :key="jobitem.id" v-bind:jobdata="jobitem" v-on:addfavoris="updateFavoris($event)" :bus="bus"/>
            </div>
            <div v-else>
              <p>Aucune offre pour votre recherche</p>
            </div> 
        </b-col>
     </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { AxiosResponse } from "axios"

import Job from '../model/job'
import Favoris from '@/model/favoris'
import CallJob from '../service/calljob'
import UserData from '@/service/user'
import Jobitem from './Jobitem.vue'
import Search from './Search.vue'
import Tag from './Tag.vue'
import FavorisList from './Favoris.vue'

import store from '@/store/store'
 
@Component({
  components: {
    Jobitem,
    Search,
    Tag,
    FavorisList
  }
})
export default class Joblist extends Vue {
  public joblist: Job[] = [new Job]; 
  public titleNb: number = -1;
  public jobdescription: string = "";
  public location: string = "";
  private favoris: Favoris = new Favoris;
  private favoriskey: number = 1;
  public bus = new Vue()

  beforeCreate() {
    store.dispatch('getFavoris').then(() => 
         this.getFavorisData()
    )
  }
    
  created() {
    const callJob: CallJob = new CallJob();
    callJob.getJob().then((value: AxiosResponse<Job[]>)=>{
        this.joblist = value.data;
        this.titleNb = value.data.length;
    })

   // this.getFavorisData()
  } 
 

  getFavorisData(): void {
   
        if(store.state.favoris !== null) {
           this.favoris = store.state.favoris;
        }
  } 

  callSearch($event: string[]): void {
       const callJob: CallJob = new CallJob();
       callJob.getJobBySearch($event[0], $event[1]).then((value: AxiosResponse<Job[]>)=>{
        this.joblist = value.data;
        this.titleNb = value.data.length;
        this.jobdescription = $event[0];
        this.location = $event[1];
    })
  }

  updateFavoris($event: Favoris): void {
    if(Object.keys($event).length > 0) {
        const userData: UserData = new UserData();
        userData.postFavoris($event).then(()=> {       
          // this.getFavorisData()
        }).catch((error: AxiosResponse<string>) => {
            console.log(error);
        })

       
    }
    
  }

  supprFavori(e: Event) {
          const favoriId: string = (e.target as Element).parentElement!.id
         
            delete this.favoris[favoriId];
          
          const userData: UserData = new UserData();
          userData.deleteFavoris(favoriId).then(()=> {       
           // this.getFavorisData()
          }).catch((error: AxiosResponse<string>) => {
              console.log(error);
          })
          this.favoriskey = this.favoriskey + 1;
          this.bus.$emit('supprfav')

          //todo déplacer cette appel api dans le store
  } 


}
</script>

<style lang="scss" scoped>
  .serp {
      min-height: 500px;
  }
</style>