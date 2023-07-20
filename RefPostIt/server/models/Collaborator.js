import { Schema } from "mongoose";


export const CollaboratorsSchema = new Schema({
  albumId: { type: Schema.Types.ObjectId, required: true, ref: 'Album' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
  {
    timestamps: true, toJSON: { virtuals: true }
  })


CollaboratorsSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

CollaboratorsSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  justOne: true,
  ref: 'Album'
})