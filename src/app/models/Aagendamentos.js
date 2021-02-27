import Sequelize, {Model} from 'sequelize'

class Agendamento extends Model{
  static init(sequelize){
    super.init({
      date: Sequelize.DATE,
      cancelado: Sequelize.DATE,

      }, {
      sequelize,
    });
  
    return this;
   
  }
  static associate(models){
    this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'}) 
    this.belongsTo(models.User, {foreignKey: 'prestador_servico_id', as: 'prestador_servico'}) 
    //o model de uuario pertence a tabela de agendamento
    // as: nome do relacionamento 
  }
}

export default Agendamento;