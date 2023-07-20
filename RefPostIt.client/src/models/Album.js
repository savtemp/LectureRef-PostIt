import { Profile } from "./Account.js"
import { DatabaseItem } from "./DatabaseItem.js"

export class Album extends DatabaseItem {
  constructor (data) {
    super(data)
    this.title = data.title
    this.category = data.category
    this.creatorId = data.creatorId
    this.creator = new Profile(data.creator)
  }
}