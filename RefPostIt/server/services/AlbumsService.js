import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


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
    if (!album) {
      throw new BadRequest(`No album found with albumId: ${albumId}`)
    }
    return album
  }

  async archiveAlbum(albumId, userId) {

    const albumToArchive = await this.getAlbumById(albumId)
    if (albumToArchive.creatorId != userId) {
      throw new Forbidden(`You cannot archive this album if it does not belong to you.`)
    }
    albumToArchive.archived = true
    await albumToArchive.save()
    return albumToArchive
  }
}


export const albumsService = new AlbumsService()