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
}


export const albumsService = new AlbumsService()