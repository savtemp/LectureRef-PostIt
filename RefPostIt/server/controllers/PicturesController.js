import { Auth0Provider } from "@bcwdev/auth0provider";
import { picturesService } from "../services/PicturesService.js";
import BaseController from "../utils/BaseController.js";


export class PicturesController extends BaseController {
  constructor() {
    super('api/pictures')
    this.router
      // ROUTES
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPicture)
  }


  async createPicture(req, res, next) {
    try {
      const pictureData = req.body
      pictureData.creatorId = req.userInfo.id
      const picture = await picturesService.createPicture(pictureData)
      return res.send(picture)
    } catch (error) {
      next(error)
    }
  }
}