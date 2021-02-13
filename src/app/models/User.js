import Sequelize, {Model} from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model{
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,//nunca vai existir na base de dados
      password_hash: Sequelize.STRING,
      prestador_servico: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });
    
    this.addHook('beforeSave', async (user) => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
      
    });

    return this;
  }
}

export default User;