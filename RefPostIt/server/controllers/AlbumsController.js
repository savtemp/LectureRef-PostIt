import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";


export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      // ROUTES
      .get('', this.getAlbums)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
  }


  async getAlbums(req, res, next) {
    try {
      const albums = await albumsService.getAlbums()
      return res.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async createAlbum(req, res, next) {
    try {
      const albumData = req.body
      albumData.creatorId = req.userInfo.id
      const album = await albumsService.createAlbum(albumData)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }
}