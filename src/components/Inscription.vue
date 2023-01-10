<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus)

let userStore = useUserStore() ;
</script>


<template>
    <div class="row">
        <div class="col-sm-6 mx-auto">
        <h1 class="ms-5"><FontAwesomeIcon icon='user-plus' />Inscription</h1>
        <form @submit.prevent="submit($event)">
            <input type="text" v-model="pseudo" required placeholder="Pseudo" class="form-control  me-2 ms-5">
            <input type="email" v-model="email" placeholder="Adresse mail" required class="form-control me-2 ms-5">
            <input type="password" v-model="password" required placeholder="votre password" class="form-control  ms-5">
            <input type="password" v-model="confirmpassword" placeholder="confirmer votre password" class="form-control ms-5">
            <input type="text" v-model="image" placeholder="Lien de votre image" class="form-control  ms-5">
            <div class="text-center mt-3">
                <input type="submit" value="Se connecter" class="btn btn-outline-dark">
            </div>
        </form>
    </div>
    </div>
</template>

<script >
    import {useUserStore} from "../userStore"
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
    import Swal from 'sweetalert2'
    library.add(faUserPlus)
    export default {
        methods : {
            submit : function(){
                if(!this.pseudo ) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'Merci de mettre un pseudo'
                    })
                }
                else if(this.pseudo && this.pseudo.length<3) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'Le pseudo doit faire plus de 3 lettres'
                    })
                }
                else if(this.password != this.confirmpassword) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: "Le mot de passe n'est pas le même dans les deux champs"
                    })
                }
                else if(this.password && this.password.length<6) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: "Le mot de passe doit contenir plus de 6 lettres"
                    })
                }
                else {
                    const profil2 = {v_pseudo : this.email}
                    const profil3 = {v_pseudo : this.pseudo}
                    const profil = {email : this.email , password : this.password , pseudo : this.pseudo, image : this.image}
                    this.userStore.used(profil2,profil3, this.email, this.password, this.pseudo ,this.image); 
                }
            },
        },
        data : () => {
            return {
                email : "",
                pseudo : "",
                password : "",
                confirmpassword : "",
                image : "",
                userStore : useUserStore()
            }
        }
    }
</script>