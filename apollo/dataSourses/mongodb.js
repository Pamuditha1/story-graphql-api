const { MongoDataSource } = require("apollo-datasource-mongodb");

module.exports.Users = class Users extends MongoDataSource {
  constructor() {
    super();
  }
  getUser(userId) {
    // const user = await User.findById(userId);
    // if (!user) return null;
    return this.findById(userId);
  }
};
