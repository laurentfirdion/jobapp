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

   import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
      BreadCrumbTail,
      Presentation
  }
})
export default class Home extends Vue{
      public title: string = "Devjob"
      public soustitre: string = "le site d'emploi des developpeurs"
}
</script>

<style lang="scss" scoped>
  .home {
      margin-top: -40px;
  }
</style>
