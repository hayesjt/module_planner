module.exports = function (sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    text: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being entered if it doesn't
      // have a text value
      allowNull: false,
      // len is a validation that checks that our todo is between 3 and 140 characters
      validate: {
        notEmpty: {
          args: true,
          msg: "Required"
        },
        is: {
          args: ["^[a-zA-Z0-9 !:@#$&()\\-`.+,/\"]*$", 'i'], 
          msg: "Only letters, numbers, and the following characters (!:@#$&()\\-`.+,/\) are allowed"
        },
        len: {
          args: [3, 140],
          msg: "Should be between 3 and 140 characters"
        }
      }
    },
    complete: {
      type: DataTypes.BOOLEAN,
      // defaultValue is a flag that defaults a new todos complete value to false if
      // it isn't supplied one
      defaultValue: false
    }
  });

  Todo.associate = function(models) {
    Todo.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Todo;
};
