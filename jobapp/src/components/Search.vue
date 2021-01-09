<template>
    <div>
        <div class="form-group">
            <input v-model.lazy="job" name="Metier" type="text" placeholder="Métier, techno, entreprise" class="form-control">
             <input v-model.lazy="city" name="ville" type="text" placeholder="Ville, région, pays" class="form-control">
             <b-button variant="primary" @click="send">Rechercher</b-button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Emit, Vue } from 'vue-property-decorator'

    @Component
    export default class Search extends Vue {
        public job: string = "";
        public city: string = "";

        created() {
    
            if(this.$route.query) {
                if(this.$route.query.k !== undefined && this.$route.query.k !== "") {
                    this.job = (this.$route.query.k as string) 
                }
                if(this.$route.query.l !== undefined && this.$route.query.l !== "") {
                    this.city = (this.$route.query.l as string)
                }
            }
        }
        
        send() {
            if(this.job !== "" || this.city !== "") {
                this.sendInfo([this.job, this.city])
            }
        }

        @Emit('search')
        sendInfo(queries: [string, string]) {
            queries
        }   
    }
</script>

<style lang="scss" scoped>

    .form-control {
        margin-bottom: 30px;
    }
    button {
        width: 100%;
    }

</style>