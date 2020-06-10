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
                <b-button variant="primary">Postuler sur le site</b-button>
                <b-button v-if="isfavori == false" variant="danger" @click.stop="buildFavoris">Mettre en favoris</b-button>
                <b-button v-else disabled variant="success">Favoris</b-button>
            </div>
           
        </b-card>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { BIconHouse, BIconBag, BIconCalendar2Date, BIconShop} from 'bootstrap-vue'
import Job from '@/model/job'
import Favoris from '@/model/favoris'

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
    private favoris: Favoris = new Favoris;
    private isfavori: boolean = false;

    @Prop() jobdata: Job
    @Prop() favorisId: [string]

    toggleClick(): void {
        this.toggle = !this.toggle;
    }
    getdate(): string {
        return new Date().toLocaleString()
    }
    buildFavoris() {
        this.favoris.title = this.jobdata.title;
        this.favoris.location = this.jobdata.location;
        this.favoris.company = this.jobdata.company;
        this.favoris.date = this.getdate();
        this.favoris.id = this.jobdata.id;
        this.isfavori = true;
        this.addFavoris(this.favoris)
    }
    checkfavoris() {
        this.favorisId.forEach((value)=> {
            if(value === this.jobdata.id) {
                this.isfavori = true;
            }
        })
    }

    mounted() {
        this.checkfavoris()
    }

    @Emit('addfavoris')
    addFavoris(favor: Favoris): void {
         favor
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
    .buttons {
        margin-bottom: 20px;  
    }

    .btn {
        &:last-child {
            margin-left: 30px;
        }
    }
</style>