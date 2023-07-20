<template>
  <div v-if="album" class="container-fluid">
    <div class="row">
      <div class="col-md-3 p-3">
        <div class="d-flex justify-content-between">
          <img :src="album.creator.picture" :alt="album.creator.name" class="img-fluid rounded">

          <div>
            <div class="bg-warning p-2 rounded mb-3">
              <h2 class="fs-5">{{ album.title }}</h2>
              <h2 class="fs-5">by: {{ album.creator.name }}</h2>
            </div>
            <button class="btn btn-info w-100">
              <i class="mdi mdi-plus-box-outline"></i>
              add Picture
            </button>
          </div>
        </div>
        <!-- NOTE collabs go here -->
        <div class="row">
          <div class="col-md-3"></div>
        </div>
      </div>
      <div class="col-md-9">

      </div>
    </div>
  </div>
  <div v-else class="container-fluid">
    <div class="row">
      <div class="col-12 py-5">
        <div class="text-center fs-1 text-light">
          <i class="mdi mdi-loading mdi-spin"></i>
          <i class="mdi mdi-loading mdi-spin mx-5"></i>
          <i class="mdi mdi-loading mdi-spin"></i>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { watchEffect, computed } from 'vue'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { albumsService } from '../services/AlbumsService.js'
import { picturesService } from '../services/PicturesService.js'
import { AppState } from '../AppState.js'
export default {
  setup() {

    const route = useRoute()

    async function getAlbumById(albumId) {
      try {
        await albumsService.getAlbumById(albumId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function getPicturesByAlbumId(albumId) {
      try {
        await picturesService.getPicturesByAlbumId(albumId)
      } catch (error) {
        Pop.error(error.message)
      }

    }

    watchEffect(() => {
      getAlbumById(route.params.albumId)
      getPicturesByAlbumId(route.params.albumId)
    })

    return {
      album: computed(() => AppState.activeAlbum)
    }
  }
}
</script>


<style lang="scss" scoped></style>