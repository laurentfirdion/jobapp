<template>
    <div class="favoris" v-if="favorItems.length > 0">
            <h2>Mes offres favoris</h2>

                <ul v-for="(favori, indexA) in favorItems" :key="indexA">
                    <li v-for="(favor, index) in favori" :key="index" :id="index">
                         {{ favor.title}}  {{ favor.company}} <br/>
                         {{ favor.location}}    
                         <b-button class="btn-sm btn-danger" @click="supprFavori">Supprimer</b-button>
                    </li>   
                </ul>
     </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import Favoris from '@/model/favoris'

    @Component
    export default class FavorisList extends Vue  {
        @Prop() favorItems: Favoris[] 
        @Prop() supprFavori: Function    
    }
</script>

<style scoped lang="scss">
  .favoris {
    background-color: #efefef;
    padding: 6px 15px;

    h2 {
        font-size: 20px;
    }
    ul {
      list-style: none;
      padding: 0;
      text-align: left;

      li {
        margin-bottom: 15px;

        button {
          display: block;
        }
      }
    }
  }
</style>