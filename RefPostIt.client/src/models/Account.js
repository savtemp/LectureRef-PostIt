import { DatabaseItem } from "./DatabaseItem.js"

export class Profile extends DatabaseItem {
  constructor (data) {
    super(data)
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
  }
}

export class Account extends Profile {
  constructor (data) {
    super(data)
    this.email = data.email
  }
}