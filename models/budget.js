module.exports = function (sequelize, DataTypes) {
var Budgets = sequelize.define("Budgets", {
    budget_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
    totalInc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Required"
            },
    },
},
    totalExp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Required"
            },
            not: {
                args: ["[a-z]",'i'],
                msg: "Only numbers allowed"
        },
        },
    },
    income_list: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Required"
            },
    },
},
expenses_list: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
        notEmpty: {
            args: true,
            msg: "Required"
        },
},
},
});
Budgets.associate = function(models) {
    Budgets.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Budgets;
};