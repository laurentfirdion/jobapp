<template>
    <div v-if="Object.keys(jobdata).length">
        <b-card
            tag="article"
            class="mb-10"
        >
            <img v-if="jobdata.company_logo !== null" :src="jobdata.company_logo" class="logo" :alt="jobdata.company" />
            <div v-else class="nologo">
                <b-icon-shop style="width: 60px; height: 60px;"></b-icon-shop>
            </div>
            <b-card-title>
                {{jobdata.title}}
            </b-card-title>
            <div class="infos">
                <p>
                     <b-icon-house></b-icon-house>
                       <span>{{jobdata.location}}</span>
                      <b-icon-bag></b-icon-bag>
                      <span>{{jobdata.type}}</span>
                      <b-icon-calendar2-date></b-icon-calendar2-date>
                       <span>{{jobdata.created_at}}</span>
                </p>              
            </div>
            <div class="buttons">
                  <span class="button" @click="toggleClick()">Voir le détail</span>
            </div>
            <b-card-text v-if="toggle">
                <div v-html="jobdata.description"></div>
            </b-card-text>

            <div>
                <router-link class="btn btn-primary" :to="`/emplois/${jobdata.id}`">Voir l'offre</router-link>
                <b-button v-if="isfavori == false" variant="danger" @click.stop="buildFavoris">Mettre en favoris</b-button>
                <b-button v-else disabled variant="success">Favoris</b-button>
            </div>
           
        </b-card>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BIconHouse, BIconBag, BIconCalendar2Date, BIconShop} from 'bootstrap-vue'
import Job from '@/model/job'
import Favoris from '@/model/favoris'
import store from '@/store/store'

 import '@/assets/style/offer.scss'

@Component({
    components: {
        BIconHouse,
        BIconBag,
        BIconCalendar2Date, 
        BIconShop
    }
})

export default class Jobitem extends Vue {
    private toggle: boolean = false;
    public isfavori: boolean = false;
   
    @Prop() jobdata: Job

    mounted() {
        const favorislist: Favoris = store.state.favoris
        this.extractFavoris(favorislist)

        store.subscribe((mutation, state) => {
            if(mutation.type === "DELETEFAVORI" ) {
                
               if(mutation.payload[1] === this.jobdata.id){
                    this.isfavori = false;
               }
            }
        })
    } 

    extractFavoris(favoris: Favoris) {
        if(favoris) {
                if(Object.entries(favoris).length === 0) {
                    this.isfavori = false;
                    return false;
                }
                for(const [key, value] of Object.entries(favoris)) {
                    for(const [keyr, valuer] of Object.entries(value)) {
                        if(keyr == "id") {
                            if(valuer === this.jobdata.id) {
                               this.isfavori = true;
                            } 
                        }
                    }
                }
            }
    }
    

    toggleClick(): void {
        this.toggle = !this.toggle;
    }
    getdate(): string {
        return new Date().toLocaleString()
    }
    buildFavoris() {
        const newfavori: Favoris = new Favoris();
        newfavori.title = this.jobdata.title;
        newfavori.location = this.jobdata.location;
        newfavori.company = this.jobdata.company;
        newfavori.date = this.getdate();
        newfavori.id = this.jobdata.id;
        
        store.dispatch('addFavoris',newfavori)
         this.isfavori = true;
    } 

}
</script>

<style lang="scss" scoped>
    
    .card {
        margin-bottom: 40px;
    }
    .card-text {
        text-align: left;
    }
    .card-title {
        margin-top: 12px;
    }
    .buttons {
        margin-bottom: 20px;  
    }

    .btn {
        &:last-child {
            margin-left: 30px;
        }
    }
</style>