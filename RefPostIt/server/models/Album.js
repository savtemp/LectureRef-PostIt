import { Schema } from "mongoose";


export const AlbumSchema = new Schema({
  title: { type: String, required: true, maxLength: 75 },
  category: { type: String, required: true, enum: ['cats', 'dogs', 'cats', 'games', 'animals', 'gachamon', 'misc'], default: 'misc' },
  archived: { type: Boolean, default: false },
  coverImg: { type: String, required: true, maxLength: 250 },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
  {
    timestamps: true, toJSON: { virtuals: true }
  })


AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})