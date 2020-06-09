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

            <b-button href="#" variant="primary">Postuler sur le site</b-button>
        </b-card>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BIconHouse, BIconBag, BIconCalendar2Date, BIconShop} from 'bootstrap-vue'

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

    @Prop({required: true, type: Object}) jobdata: object 

    toggleClick(): void {
        this.toggle = !this.toggle;
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

        .button {
            color: var(--primary);
            cursor: pointer;
        }
    }
</style>