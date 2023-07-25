import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class CollaboratorsService {
  async createCollab(collabData) {
    const newCollab = await dbContext.Collaborators.create(collabData)
    return newCollab
  }

  async getCollaboratorsByAlbumId(albumId) {
    const collaborators = await dbContext.Collaborators.find({ albumId }).populate('profile', 'name picture')
    return collaborators
  }

  async getMyAlbumCollaborations(accountId) {
    const albumCollabs = await dbContext.Collaborators.find({ accountId }).populate('album')
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