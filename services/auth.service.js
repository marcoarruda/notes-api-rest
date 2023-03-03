import bcrypt from 'bcryptjs'

export default {
  model: null,

  setModel (model) {
    console.log('auth.setModel')
    this.model = model
  },

  async getUsers () {
    console.log('auth.getUsers')
    const users = await this.model.find({})

    return users
  },

  async register (dto) {
    const user = new this.model({
      email: dto.email,
      password: bcrypt.hashSync(dto.password, 8),
      createdAt: new Date(),
    });

    await user.save()
  },
}