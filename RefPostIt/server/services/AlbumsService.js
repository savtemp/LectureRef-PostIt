import { dbContext } from "../db/DbContext.js"


class AlbumsService {
  async getAlbums() {
    const albums = await dbContext.Albums.find().populate('creator', 'name picture')
    return albums
  }

  async createAlbum(albumData) {
    const newAlbum = await dbContext.Albums.create(albumData)
    await newAlbum.populate('creator', 'name picture')
    return newAlbum
  }

  async getAlbumById(albumId) {
    const album = (await dbContext.Albums.findById(albumId)).populate('creator', 'name picture')
    return album
  }

  async archiveAlbum(albumId) {

    const albumToArchive = await this.getAlbumById(albumId)
    albumToArchive.archived = true
    await albumToArchive.save()
    return albumToArchive
  }
}


export const albumsService = new AlbumsService()