module.exports = function (sequelize, DataTypes) {
  var Progress = sequelize.define("Progress", {
    water_goal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Required"
        },
        not: {
          args: ["[a-z]", 'i'],
          msg: "Only numbers allowed"
        }
      }
    },
    water_intake: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          arge: true,
          msg: "Required"
        },
        not: {
          args: ["[a-z]", 'i'],
          msg: "Only numbers allowed"
        }
      }
    },
  });

  Progress.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Progress.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Progress;
};
