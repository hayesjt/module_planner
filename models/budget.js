module.exports = function (sequelize, DataTypes) {
    var Budget = sequelize.define("Budget", {
            budget: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Required"
                    },
            },
            userId: {
              type: DataTypes.INTEGER,
                allowNull: false,
            }
          }
        
    });
          return Budget;
        };