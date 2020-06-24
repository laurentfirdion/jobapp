<template>
    <div>
     <div class="home">
        <Presentation :title="title" :soustitre="soustitre" />
       <Carrousel :joblisthome="joblisthome" />
     </div>
     <b-container>
         <BreadCrumbTail />  
     </b-container>
    </div>
</template>

<script lang="ts">
  import BreadCrumbTail from '@/components/Breadcrumb.vue'
  import Presentation from '@/components/Presentation.vue'
  import Carrousel from '@/components/Carrousel.vue'
  import Job from '@/model/job'
  import { AxiosResponse } from "axios"
  import CallJob from '../service/calljob'
 
  import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: {
      BreadCrumbTail,
      Presentation,
      Carrousel
  }
})
export default class Home extends Vue{
      public title: string = "Devjob"
      public soustitre: string = "le site d'emploi des developpeurs"
      public isHome: boolean = false
      joblisthome: Job[] = [new Job]; 

      created(){
        this.isHome = true
        const callJob: CallJob = new CallJob();
        callJob.getJob().then((value: AxiosResponse<Job[]>)=>{
            this.joblisthome = value.data.slice(0,4);
        })
      }

      beforeDestroy(){
        this.isHome = false
          document!.querySelector('body')!.classList.remove('home')
      }
      
      @Watch('isHome')
      backColor() {
        if(this.isHome === true) {
          document!.querySelector('body')!.classList.add('home')
        } else {
           document!.querySelector('body')!.classList.remove('home')
        }
      }

} 
</script>

<style lang="scss" scoped>
  .home {
      color: #ffffff;
      margin-top: -40px;
      min-height: 500px;
  } 
  .breadcrumb {
    color: #ffffff;
    margin-top: 50px;
  }
</style>
