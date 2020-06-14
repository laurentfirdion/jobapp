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
               <BreadCrumbTail :bus="bus" />
     </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
    import { AxiosResponse } from "axios"
    import { BIconHouse, BIconBag, BIconCalendar2Date, BIconShop} from 'bootstrap-vue'
    import BreadCrumbTail from '@/components/Breadcrumb.vue'
    import CallJob from '../service/calljob'
    import Job from '../model/job'

    import '@/assets/style/offer.scss'

    @Component({
        components: {
            BIconHouse,
            BIconBag,
            BIconCalendar2Date, 
            BIconShop,
            BreadCrumbTail
        }
    })
    export default class DetailOffre extends Vue  {
          @Prop() id: string

          public job: Job = new Job
          private is404: boolean = false
          public bus = new Vue()

        @Watch('id')
        onchangeId() {
            this.callForjob()
        }

        created() {
            this.callForjob()
        }
 
        callForjob() {
              const callJob: CallJob = new CallJob();
              if(this.id !== "") {
              callJob.getDetailJob(this.id).then((value: AxiosResponse<Job>)=>{
                    this.job = value.data;   
                    this.bus.$emit('detailoaded', value.data.title)
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
          margin-bottom: 40px;
          text-align: center;
      }
      h2 {
          font-size: 18px;
          line-height: normal;
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
          margin-bottom: 15px;
          margin-top: 7px;  

          a {
            color: #303030;
          }
      }
      h4 {
          color: #007bff;
          font-weight: 700;
          font-size: 16px;
      }
      .logo {
        margin: auto;
        display: block;
        margin-bottom: 13px;
      }
    .infos {
        background-color: #efefef;
        padding: 15px 15px;
        margin-bottom: 30px;

        p {
            margin: 0;
        }
    }
    
  }
</style>