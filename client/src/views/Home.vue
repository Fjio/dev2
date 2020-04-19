<!-- eslint-disable max-len -->
<!-- eslint-disable no-trailing-spaces -->
<template>
  <div class="home text-center">
    <div class="jumbotron">
  <h1 class="display-4">Authentification</h1>
  <p class="lead">On s'amuse pas mal</p>
  <hr class="my-4">
  <p>J'adore quand ça bugge pas</p>
  <p class="lead">
    <router-link
    class="btn btn-primary btn-lg" 
    :to="{name: 'signup' }" 
    role="button">Inscris-toi !</router-link>
  </p>
</div>
  </div>
</template>

<script>


export default {
  name: 'Home',
};
</script>
