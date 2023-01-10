<template>
    <div>
        <h1>Connexion</h1>
        <form @submit.prevent="submit($event)">
            <div class="d-flex">
                <input type="text" v-model="email" placeholder="votre login" class="form-control w-50 me-2">
                <input type="password" v-model="password" placeholder="votre password" class="form-control w-50 ms-2">
            </div>
            <div class="text-center mt-3">
                <input type="submit" value="Se connecter" class="btn btn-outline-dark">
            </div>
        </form>
    </div>
</template>

<script>
    import {useUserStore} from "../userStore"
    import router from "../router"; 
    import { RouterLink } from "vue-router"
    export default {
        methods : {
            submit : function(){
                const profil = {email : this.email , password : this.password }
                this.userStore.authentification(profil); 
                router.push("Home")
            }
        },
        data : () => {
            return {
                email : "",
                password : "",
                userStore : useUserStore()
            }
        }
    }
</script>