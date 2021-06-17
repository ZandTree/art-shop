<template>
  <div id="app">
    
      <app-menu></app-menu>
    <h1>App greets you</h1>     
   
    <div class="container">
      <router-view />
    </div>
   </div>
  
  
</template>
<script>
import AppMenu from '@/components/Menu'


export default { 
  name:'App',
  components:{
    AppMenu
  },
  
}
</script>

<style>
#app{
  background-color: cornsilk;
  height: 100vh;
}
</style>