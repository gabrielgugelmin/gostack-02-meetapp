import bcrypt from 'bcrypt';
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(attributes, options) {
    super.init(
      {
        // attributes
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        // options
        sequelize: options.sequelize,
      }
    );

    this.addHook('beforeSave', async (user, options) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
