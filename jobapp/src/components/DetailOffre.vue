<template>
    <div class="detail">
             <b-row v-if="Object.keys(job).length > 0">
                 <b-col col lg="9">
                     <div class="header">
                         <h1>{{job.title}}</h1>
                     </div>
                     <div class="infos">
                         <p>
                            <b-icon-house></b-icon-house>
                            <span>{{job.location}}</span>
                            <b-icon-bag></b-icon-bag>
                            <span>{{job.type}}</span>
                            <b-icon-calendar2-date></b-icon-calendar2-date>
                            <span>{{job.created_at}}</span>
                        </p>        
                     </div>
                     <article>
                         <div v-html="job.description"></div>
                     </article>
                 </b-col>
                  <b-col col lg="3">
                     <b-card>
                         <img v-if="job.company_logo !== null" :src="job.company_logo" class="logo" :alt="job.company" />
                        <div v-else class="nologo">
                            <b-icon-shop style="width: 60px; height: 60px;"></b-icon-shop>
                        </div>
                        <h2 v-if="job.company_url !== null"><a target="_blank" :href="job.company_url">{{job.company}}</a></h2>
                        <h2 v-else>{{job.company}}</h2>

                        <div class="howtoapply">
                            <h4>Comment postuler</h4>
                            <div v-html="job.how_to_apply"></div>
                        </div>
                     </b-card>
                 </b-col>
             </b-row> 
             <div v-if="is404">
                 <h1>Cette offre n'existe pas</h1>
             </div>
     </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
    import { AxiosResponse } from "axios"
    import { BIconHouse, BIconBag, BIconCalendar2Date, BIconShop} from 'bootstrap-vue'
    import CallJob from '../service/calljob'
    import Job from '../model/job'

    @Component({
        components: {
            BIconHouse,
            BIconBag,
            BIconCalendar2Date, 
            BIconShop
        }
    })
    export default class DetailOffre extends Vue  {
          @Prop() id: string

          public job: Job = new Job
          private is404: boolean = false

        @Watch('id')
        onchangeId() {
            this.callForjob()
        }
        
        mounted() {
            this.callForjob()
        }

        callForjob() {
              const callJob: CallJob = new CallJob();
              if(this.id !== "") {
              callJob.getDetailJob(this.id).then((value: AxiosResponse<Job>)=>{
                    this.job = value.data;   
                }).catch((error: AxiosResponse<string>) => {
                     console.log(error)
                   this.is404 = true
                })
              }
          }
    }
</script>

<style scoped lang="scss">
  .detail {
      color: #303030;
      text-align: left;

      h1 {
          text-align: center;
      }

    .logo {
        width: 120px;
        height: 80px;
    }
    .nologo {
        border: 1px solid #999;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 120px;
        height: 80px;
    }
    .infos {
        span {
            margin-left: 6px;

            &:not(:last-child) {
                margin-right: 10px;
            }
        }
    }
  }
</style>