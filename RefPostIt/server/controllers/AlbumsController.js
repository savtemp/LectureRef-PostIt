import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";
import { picturesService } from "../services/PicturesService.js";
import { collaboratorsService } from "../services/CollaboratorsService.js";


export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      // ROUTES
      .get('', this.getAlbums)
      .get('/:albumId', this.getAlbumById)
      .get('/:albumId/pictures', this.getPicturesByAlbumId)
      .get('/:albumId/collaborators', this.getCollaboratorsByAlbumId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
      .delete('/:albumId', this.archiveAlbum)
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

  async getAlbumById(req, res, next) {
    try {
      const albumId = req.params.albumId
      const album = await albumsService.getAlbumById(albumId)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async archiveAlbum(req, res, next) {
    try {
      const albumId = req.params.albumId
      const userId = req.userInfo.id
      const archivedAlbum = await albumsService.archiveAlbum(albumId, userId)
      return res.send(archivedAlbum)
    } catch (error) {
      next(error)
    }
  }

  async getPicturesByAlbumId(req, res, next) {
    try {
      const albumId = req.params.albumId
      const pictures = await picturesService.getPicturesByAlbumId(albumId)
      return res.send(pictures)
    } catch (error) {
      next(error)
    }
  }

  async getCollaboratorsByAlbumId(req, res, next) {
    try {
      const albumId = req.params.albumId
      const collaborators = await collaboratorsService.getCollaboratorsByAlbumId(albumId)
      return res.send(collaborators)
    } catch (error) {
      next(error)
    }
  }
}