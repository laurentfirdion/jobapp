<template>
    <span v-if="tagname !== ''" class="tag">{{tagname}}</span>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component
    export default class Tag extends Vue  {
        @Prop({required: true, type: String}) tagname: string 
    }
</script>

<style lang="scss" scoped>
    .tag {
        border: 1px solid grey;
        border-radius: 15px;
        margin-right: 12px;
        padding: 7px 12px;
    }
</style>