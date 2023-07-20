import { dbContext } from "../db/DbContext.js"


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

  // TODO utility function in order to null check
  // async getCollabById(){

  // }

  async deleteMyCollaboration(collabId, userId) {
    const collabToBeRemoved = await dbContext.Collaborators.findById(collabId)
    // TODO use utility to null check 
    // if(collabToBeRemoved.collabId != userId){

    // }
    // @ts-ignore
    await collabToBeRemoved.remove()
    return collabToBeRemoved
  }
}


export const collaboratorsService = new CollaboratorsService()