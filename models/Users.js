const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: {
      type: String, lowercase: true, unique: true, trim: true,
    },
    password: { type: String, min: 8 },
  },
  {
    timestamps: true,
  },
);

// do not return password
userSchema.set('toJSON', {
  transform(doc, ret, opt) {
    delete ret['password'];
    return ret;
  },
});

// on save hook
userSchema.pre('save', function(next) {
  const user = this;

  if (!this.isModified('password')) {
    console.log('password not modified');
    return next();
  }

  console.log('password modified');
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) { return next(error); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('Users', userSchema);
