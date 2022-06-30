module.exports = class UserDto {
  email
  id
  isActived
  constructor(model) {
    this.email = model.email
    this.id = model._id
    this.isActived = model.isActived
  }
}
