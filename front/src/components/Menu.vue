<template>
 <header class="bg-dark">   
  <b-navbar toggleable="lg" type="light" class="bg-info-2">
    <b-navbar-brand href="#">
      <router-link :to="{ name: 'home' }" class="link-decor"
              >Home
      </router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">
          <router-link :to="{ name: 'signup' }" class="link-decor"
              >SignUp</router-link
            >
         
        </b-nav-item>
        <b-nav-item href="#" >
          <router-link :to="{ name: 'login' }" class="link-decor"
              >Login</router-link
            >
        </b-nav-item>
        <b-nav-item href="#" >
          <router-link :to="{ name: 'google' }" class="link-decor"
              >Login via Google</router-link
            >
        </b-nav-item>
        <b-nav-item href="#" >
          <a href="#" @click="doSignOut">Sign Out</a>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
           <span class="link-decor">User</span>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </header>


</template>
<script>
export default {
    name:'Menu',
    methods:{
      doSignOut(){
        console.log("Sign out...")
        this.$store.dispatch('signOut')
      }
    }
}
</script>
<style>
.bg-info-2{
  background-color: brown;
  color:white;
}

.link-decor{
  color:white;
}

.link-decor:hover{
  color:black;
}
</style>