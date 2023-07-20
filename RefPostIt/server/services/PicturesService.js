import { dbContext } from "../db/DbContext.js"


class PicturesService {
  async createPicture(pictureData) {
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