const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserRoleSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    role: { type: String, enum: ['admin','user'] },
  },
  {
    timestamps: true,
  },
);


module.exports = mongoose.model('User_Roles', UserRoleSchema);
