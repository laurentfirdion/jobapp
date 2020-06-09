<template>
  <div>
     <b-row>
        <b-col col lg="3">
          <p>Recherche</p>
          <Search v-on:search="callSearch($event)" />
        </b-col>
        <b-col col lg="9">
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
import Vue from 'vue'
import Component from 'vue-class-component'
import { AxiosResponse } from "axios"

import Job from '../model/job'
import CallJob from '../service/calljob'
import Jobitem from './Jobitem.vue'
import Search from './Search.vue'
import Tag from './Tag.vue'
 
@Component({
  components: {
    Jobitem,
    Search,
    Tag
  }
})
export default class Joblist extends Vue {
  public joblist: Job[] = [new Job]; 
  public titleNb: number = -1;
  public jobdescription: string = "";
  public location: string = "";
    
  created() {
    const callJob: CallJob = new CallJob();
    callJob.getJob().then((value: AxiosResponse<Job[]>)=>{
        this.joblist = value.data;
        this.titleNb = value.data.length;
    })
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

}
</script>

<style lang="scss">

</style>