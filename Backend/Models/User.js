module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    return User;
  };