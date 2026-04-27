import User from "../models/user.js";

// GET all users
export function getUsers() {
  return User.find({});
}

// GET user by ID
export function getUserById(id) {
  return User.findById(id);
}

// GET users by name
export function findUserByName(name) {
  return User.find({ name: name });
}

// GET users by job
export function findUserByJob(job) {
  return User.find({ job: job });
}

// GET users by name AND job
export function findUserByNameAndJob(name, job) {
  return User.find({ name: name, job: job });
}

// POST create new user
export function addUser(user) {
  const newUser = new User(user);
  return newUser.save();
}

// DELETE user by ID
export function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}
