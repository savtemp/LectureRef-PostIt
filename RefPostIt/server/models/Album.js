import { Schema } from "mongoose";


export const AlbumSchema = new Schema({
  title: { type: String, required: true, maxLength: 75 },
  category: { type: String, required: true, enum: ['cats', 'dogs', 'cats', 'games', 'gachamons', 'misc'], default: 'misc' },


})