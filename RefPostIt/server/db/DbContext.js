import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { AlbumSchema } from '../models/Album.js';
import { PictureSchema } from '../models/Picture.js';
import { CollaboratorsSchema } from '../models/Collaborator.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Albums = mongoose.model('Album', AlbumSchema)

  Pictures = mongoose.model('Picture', PictureSchema)

  Collaborators = mongoose.model('Collaborator', CollaboratorsSchema)
}

export const dbContext = new DbContext()
