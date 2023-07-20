<template>
  <div class="container">
    <div class="row">
      <div v-for="album in albums" :key="album.id" class="col-md-3 mb-3">
        <AlbumCard :albumProp="album" />
      </div>
    </div>
  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { albumsService } from '../services/AlbumsService.js'
import { onMounted, computed } from 'vue'
import { AppState } from '../AppState.js';
import AlbumCard from '../components/AlbumCard.vue';

export default {
  setup() {
    async function getAlbums() {
      try {
        await albumsService.getAlbums();
      }
      catch (error) {
        Pop.error(error.message);
      }
    }

    onMounted(() => {
      getAlbums();
    });

    return {
      albums: computed(() => AppState.albums)
    };
  },
  components: { AlbumCard }
}
</script>

<style scoped lang="scss"></style>
