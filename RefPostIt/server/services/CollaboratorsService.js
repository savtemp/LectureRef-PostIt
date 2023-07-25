import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"


class CollaboratorsService {
  async createCollab(collabData) {

    // NOTE get the album we want by calling to the albumsService function to getById
    const album = await albumsService.getAlbumById(collabData.albumId)
    // NOTE check to see if the album has been archived
    if (album.archived == true) {
      throw new Forbidden(`${album.title} does not exist. You cannot become a collaborator on ${album.title}.`)
    }
    // NOTE if the album has not been archived proceed with creating the collab
    const newCollab = await dbContext.Collaborators.create(collabData)
    return newCollab
  }

  async getCollaboratorsByAlbumId(albumId) {
    const collaborators = await dbContext.Collaborators.find({ albumId }).populate('profile', 'name picture')
    return collaborators
  }

  async getMyAlbumCollaborations(accountId) {
    const albumCollabs = await dbContext.Collaborators.find({ accountId }).populate('album')
    // NOTE nested populate :
    // NOTE call to the album virtual
    // NOTE target the specific album, populate the virtuals on to the original 'album' virtual
    // .populate({
    //   path: "album",
    //   populate: {
    //     path: "creator memberCount"
    //   }
    // })
    return albumCollabs
  }

  async deleteMyCollaboration(collabId, userId) {
    const collabToBeRemoved = await dbContext.Collaborators.findById(collabId)
    if (!collabToBeRemoved) {
      throw new BadRequest(`The collaboration at this collaborationId: ${collabId}, does not exist.`)
    }
    if (collabToBeRemoved.accountId != userId) {
      throw new Forbidden('You cannot remove a collaboration that is not yours.')
    }
    // @ts-ignore
    await collabToBeRemoved.remove()
    return collabToBeRemoved
    // return `Your collaboration has been removed.`
  }
}


export const collaboratorsService = new CollaboratorsService()