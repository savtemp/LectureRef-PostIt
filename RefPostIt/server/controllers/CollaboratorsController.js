import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { collaboratorsService } from "../services/CollaboratorsService.js";



export class CollaboratorsController extends BaseController {
  constructor() {
    super('api/collaborators')
    this.router
      // ROUTES
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCollab)
      .delete('/:collaborationId', this.deleteMyCollaboration)
  }


  async createCollab(req, res, next) {
    try {
      const collabData = req.body
      collabData.accountId = req.userInfo.id
      const collab = await collaboratorsService.createCollab(collabData)
      return res.send(collab)
    } catch (error) {
      next(error)
    }
  }

  async deleteMyCollaboration(req, res, next) {
    try {
      const collabId = req.params.collaborationId
      const userId = req.userInfo.id
      const myCollab = await collaboratorsService.deleteMyCollaboration(collabId, userId)
      return res.send(myCollab)
    } catch (error) {
      next(error)
    }
  }
}