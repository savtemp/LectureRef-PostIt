import { AppState } from "../AppState.js"
import { Album } from "../models/Album.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AlbumsService {
  async getAlbums() {
    const res = await api.get('api/albums')
    logger.log('[GOT ALBUMS]', res.data)
    const albums = res.data.map(albumPojo => new Album(albumPojo))
    AppState.albums = albums
  }

  async getAlbumById(albumId) {
    const res = await api.get(`api/albums/${albumId}`)
    logger.log('[GOT ALBUM BY ID]', res.data)
    const album = new Album(res.data)
    AppState.activeAlbum = album
  }

}

export const albumsService = new AlbumsService()