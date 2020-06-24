<template>
    <b-container class="carrousel" v-if="joblisthome.length > 1">
        <h2>Découvrez les dernières offres</h2>
        <Carousel :perPage="1" :navigationEnabled="true">
            <Slide v-for="jobitem in joblisthome" :key="jobitem.id"> 
                <img v-if="jobitem.company_logo !== null" :src="jobitem.company_logo" class="logo" :alt="jobitem.company" />
                <div v-else class="nologo">
                    <b-icon-shop style="width: 60px; height: 60px;"></b-icon-shop>
                </div>
                <h3> {{jobitem.title}}</h3>
                <p><span>{{jobitem.location}}</span></p>
                <div><router-link class="btn btn-primary" :to="`/emplois/${jobitem.id}`">Voir l'offre</router-link></div>
            </Slide>
        </Carousel>
    </b-container>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { Carousel, Slide } from 'vue-carousel';
    import Job from '@/model/job'

    import '@/assets/style/offer.scss'

    @Component({
        components: {
            Carousel,
            Slide
        }
    })
    export default class Carrousel extends Vue  {
       @Prop() joblisthome: Job[]
    }
</script>

<style lang="scss" scoped>
    .carrousel {
        margin-top: 80px;

        h2 {
            font-size: 20px;
            margin: 20px 0 15px;
            text-align: left;
        }
        h3 {
            font-size: 18px;
            margin-top: 15px;
        }

        .VueCarousel-slide {
            background-color: rgba($color: #ffffff, $alpha: .3);
            border-radius: 20px;
            padding: 25px;
        }
        .VueCarousel-navigation-button {
            color: #fff !important;
        }
    }
</style>