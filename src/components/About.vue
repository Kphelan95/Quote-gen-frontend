<template>
    <h1 class="center" >the current version {{version}}</h1>
</template>


<script>

export default {
   data: () => ({
       version : process.env.VUE_APP_VERSION
  })
}
</script>

<style scoped>
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color:white;
}
</style>