<template>
    <div>
     <div class="home">
        <Presentation :title="title" :soustitre="soustitre" />
       
     </div>
      <BreadCrumbTail />  
    </div>
</template>

<script lang="ts">
  import BreadCrumbTail from '@/components/Breadcrumb.vue'
  import Presentation from '@/components/Presentation.vue'

 
   import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: {
      BreadCrumbTail,
      Presentation
  }
})
export default class Home extends Vue{
      public title: string = "Devjob"
      public soustitre: string = "le site d'emploi des developpeurs"
      public isHome: boolean = false

  /*     get countProp(): number {
        return store.state.count
      } */

      created(){
        this.isHome = true
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
    padding: 0 30px;
  }
</style>
