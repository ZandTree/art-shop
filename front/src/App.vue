<template>
  <div id="app">
    
      <Menu></Menu>
    <h1>App greets you</h1>     
   
    <div class="container">
      <router-view />
    </div>
   </div>
  
  
</template>
<script>
import Menu from '@/components/Menu'
export default { 
  components:{
    Menu
  } 
}
</script>

<style>
#app{
  background-color: cornsilk;
  height: 100vh;
}
</style>