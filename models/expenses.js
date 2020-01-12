module.exports = function (sequelize, DataTypes) {
    var Expenses = sequelize.define("Expenses", {
 description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                      args: true,
                      msg: "Required"
                    },
                    is: {
                      args: ["^[a-zA-Z0-9 !:@#$&()\\-`.+,/\"]*$", 'i'], 
                      msg: "Only letters, numbers, and the following characters (!:@#$&()\\-`.+,/\) are allowed"
                    },
                },
            },
            value: {
                type: DataTypes.INTEGER,
                allowNull: false,
                
                },
                userId: {
                    type: DataTypes.INTEGER,
                      allowNull: false,
                  }
        })
          return Expenses;
        };