<template>
  <router-link :to="{ name: 'Album', params: { albumId: albumProp.id } }">
    <div class="rounded bg-random selecatable">
      <img class="rounded-top img-fluid" :src="albumProp.coverImg" alt="">
      <div class="text-center text-light p-2">
        <h2 class="fs-3">{{ albumProp.title }}</h2>
        <h3 class="fs-4"><i class="mdi mdi-heart"></i> 0</h3>
      </div>
    </div>
  </router-link>
</template>


<script>
import { RouterLink } from 'vue-router';
import { Album } from '../models/Album.js';

export default {
  props: {
    albumProp: { type: Album, required: true }
  },
  setup() {
    function getRandomBgColor() {
      const colors = ["#3DA69F", "#54C58F", "#6951CA", "#EAB222"];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }
    return {
      randomBgColor: getRandomBgColor()
    };
  },
  components: { RouterLink }
}
</script>


<style lang="scss" scoped>
img {
  height: 35vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.bg-random {
  background-color: v-bind(randomBgColor);
  box-shadow: 3px 3px white;
}
</style>