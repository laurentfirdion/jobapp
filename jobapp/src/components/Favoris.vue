<template>
    <div class="favoris" v-if="Object.entries(favorItems).length > 0">
            <h2>Mes offres favoris</h2>
                <ul>
                    <li v-for="(favor, index) in favorItems" :key="index" :id="index">
                         {{ favor.title}}  {{ favor.company}} <br/>
                         {{ favor.location}}    
                         <b-button :id="favor.id" class="btn-sm btn-danger" @click="supprFavori">Supprimer</b-button>
                    </li>   
                </ul>
                <p v-if="countfavoris > 0">{{countfavoris}} offre{{countfavoris > 1 ? "s" : ""}} en favori</p>
     </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import Favoris from '@/model/favoris'
    import store from '@/store/store'

    @Component
    export default class FavorisList extends Vue  {
        @Prop() favorItems: Favoris[] 
        @Prop() supprFavori: Function    

        get countfavoris() {
          return store.getters.countFavoris
        }
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