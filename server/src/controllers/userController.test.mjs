import supertest from "supertest";
import app from "../index.js";
import User from "../models/UserModel.js";
import {
  signUp,
  signIn,
  toggleFavorite,
  toggleWatchList,
} from "./userController.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

// Mock mongoose's User model methods
jest.mock("../models/UserModel.js");

// Mock bcrypt methods
jest.mock("bcryptjs", () => ({
  hashSync: jest.fn(() => "hashedpassword"),
  compareSync: jest.fn(() => true),
}));

// Mock your token utility
jest.mock("../utils.js", () => ({
  generateToken: jest.fn(() => "test_token"),
  isAuth: jest.fn((req,res,next) => next())
}));



const request = supertest(app);

describe("userController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signUp", () => {
    it("should sign up a new user", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      User.mockReturnValueOnce(userData);
      User.prototype.save = jest.fn().mockResolvedValue(userData);

      const response = await request.post("api/users/signup").send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        token: "test_token",
      });
    });
  });

  describe("signIn", () => {
    it("should sign in an existing user", async () => {
        const userData = {
          username: "testuser",
          email: "test@example.com",
          password: "password123",
        };

        User.findOne = jest.fn().mockResolvedValue(userData);

        const response = (await request.post("/api/users/signin")).send(userData);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            user: {
                _id: userData._id,
                username: userData.username,
                email: userData.email,
                favoritesList: userData.favoritesList,
                watchList: userData.watchList,
            },
            token: "test_token",
        });
    });

    it("should return 401 for invalid credentials", async () => {
        const userData = {
            email: "test@example.com",
            password: "wrongPassword",
        };

        User.findOne = jest.fn().mockResolvedValue(null);

        const response = await request.post("/api/users/signin").send(userData);
        expect(response.status).toBe(401);
        expect(response.text).toBe("Invalid Credentials");
    });
  });
  
  describe("toggle favorites",() => {
    it("should add a content ID to the favorites list if it does not exist", async () => {
      const userId = "mockUserId";
      const contentId = 'mockContentId';

      const mockUser = {
        _id: userId,
        favoritesList: [],
        save: jest.fn().mockImplementation(function() {
          this.favoritesList.push(contentId);
          return Promise.resolve(this);
        }),
        populate: jest.fn().mockResolvedValue(),
      };

      User.findById = jest.fn().mockResolvedValue(mockUser);

      const response = (await request.post(`api/users/toggle-favorite/${contentId}`)).set("user",userId).send();

      expect(response.status).toBe(200);
      expect(response.body).toEqual({favoritesList: [contentId]});
    })
    //add more later
  });

  describe("toggle Watch list", () => {
    it("should add a content ID to the watch list if it does not exist", async () => {
      const userId = 'mockUserId' ;
      const contentId = 'mockContentId';

      const mockUser = {
        _id: userId,
        watchedList: [],
        save:jest.fn().mockImplementation(function (){
          this.watchedList.push({'content': contentId,'stoppedAt': null})
          return Promise.resolve(this);
        }),
        populate:jest.fn().mockResolvedValue(),
      };

      User.findById = jest.fn().mockResolvedValue(mockUser);
      
      const response = (await request.post(`/api/users/toggle-watch/${contentId}`).set("user", userId)).send();

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({watchList: [{content: contentId, stoppedAt: 0}]});
    });

    //add more later
  })
});
