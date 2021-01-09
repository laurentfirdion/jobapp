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
              <Jobitem v-for="jobitem in joblist" :key="jobitem.id" v-bind:jobdata="jobitem" />
            </div>
            <div v-else>
              <p>Aucune offre pour votre recherche</p>
            </div> 
        </b-col>
     </b-row>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { AxiosResponse } from "axios"

import Job from '../model/job'
import Favoris from '@/model/favoris'

import CallJob from '../service/calljob'
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
  k: string = "";
  l: string = "";
 
  beforeCreate() {
    store.dispatch('getFavoris').then(() => 
         this.getFavorisData()
    )
     store.subscribe((mutation, state) => {
            if(mutation.type === "ADDFAVORI") {
                this.favoris = state.favoris;
                this.favoriskey = this.favoriskey + 1;
            }
        })
  }
    
  created() {
    
    if(this.$route.query) {
         if(this.$route.query.k !== undefined && this.$route.query.k !== "") {
           this.k = (this.$route.query.k as string) 
         }
         if(this.$route.query.l !== undefined && this.$route.query.l !== "") {
           this.l = (this.$route.query.l as string)
         }
    }

    if(this.k !== "" || this.l !== "") {
      this.callSearch([this.k,this.l])
    } else {
      const callJob: CallJob = new CallJob();
        callJob.getJob().then((value: AxiosResponse<Job[]>)=>{
          this.joblist = value.data;
          this.titleNb = value.data.length;
      })
    }
    
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

        const searchurl: string = location.search;

        const regexk = RegExp($event[0]);
        const regexl = RegExp($event[1]);
          if(!regexk.test(searchurl) || !regexl.test(searchurl)) {
              this.$router.push({name: 'Emplois', query: {k: $event[0], l: $event[1]}})
          }
        })
        
  }


  supprFavori(e: Event) {
          const favoriId: string = (e.target as Element).parentElement!.id
          const fid: string|null = (e.target! as Element).getAttribute!('id')
          delete this.favoris[favoriId];
          const arrayTopush: [string, string|null] = [favoriId, fid]   
          store.dispatch('supprFavoris', arrayTopush) 
          
          this.favoriskey = this.favoriskey + 1;
  } 


}
</script>
 
<style lang="scss" scoped>
  .serp {
      min-height: 500px;
  }
</style>