// models
const User = require('../../models/Users');

const { respondSuccess } = require('../../helpers/response');

module.exports = {
  getUserDetails: async(req, res, next) => {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'user_roles',
          localField: '_id',
          foreignField: 'user',
          as: 'userRole'
        }
      },
      {
        $unwind: {path: '$userRole'},
      },
      {
        $group: {
          _id: '$userRole.role',
          users: {
            $push: {
              firstName: '$firstName',
              lastName: '$lastName',
              email: '$email',
              role: '$userRole.role',
            }
          } 
        }
      }
    ])
    
    return respondSuccess(res, null, users);
  },
};