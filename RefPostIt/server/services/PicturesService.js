import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"


class PicturesService {
  async createPicture(pictureData) {

    // NOTE get the album we want by calling to the album service
    const album = await albumsService.getAlbumById(pictureData.albumId)
    // NOTE check to see if the album is archived
    if (album.archived == true) {
      throw new Forbidden(`${album.title} does not exist. You cannot add any pictures to ${album.title}.`)
    }
    // NOTE if the album is not archived, proceed with creating a picture
    const picture = await dbContext.Pictures.create(pictureData)
    await picture.populate('creator', 'name picture')
    return picture
  }

  async getPicturesByAlbumId(albumId) {
    // NOTE find method takes in an object, just based on how the method works
    // NOTE find pictures where theres albumIds and only give back the pictures that have that albumId
    // pictures.filter(p => p.albumId == albumId)
    // const pictures = await dbContext.Pictures.find({ albumId: id })
    const pictures = await dbContext.Pictures.find({ albumId }).populate('creator', 'name picture')
    return pictures
  }
}


export const picturesService = new PicturesService()