const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const createError = require("http-errors");

class authService {
  static async register(data) {
    const { email } = data;

    data.password = bcrypt.hashSync(data.password, 8);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      user = await prisma.user.create({
        data,
      });
    } else {
      console.log("Ja existe");
      console.log(user);
    }

    data.accessToken = await jwt.signAccessToken(user);

    return data;
  }

  static async login(data) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw createError.NotFound("User not registered");
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword)
      throw createError.Unauthorized("Email address or password not valid");

    delete user.password;

    const accessToken = await jwt.signAccessToken(user);

    return { ...user, accessToken };
  }

  static async all() {
    const allUsers = await prisma.user.findMany();

    return allUsers;
  }
}

module.exports = authService;
