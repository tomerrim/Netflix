// import User from "../models/UserModel.js";
// import bcrypt from "bcryptjs";
// import { generateToken } from "../utils.js";
// import { signIn, signUp, toggleFavorite } from "./userController";

// describe("user controller", () => {
//   describe("signUp", () => {
//     it("should create a new user and return the user object", async () => {
//       const { username, email, password } = {
//         username: "test_user",
//         email: "test@email.com",
//         password: "testPassword",
//       };

//       const expectedUser = {
//         _id: "",
//         username,
//         email,
//         password
//       };

//       const req = {
//         body: {
//           username,
//           email,
//           password,
//         }
//       };

//       const res = {};
      
//       await signUp(req, res);
//       const actualUser = await User.findOne({email});
//       await expect(actualUser).toEqual(expectedUser);
//     }, {
//       timeout: 10000,
//     });

//     it("should not create a new user if the email is already registered", async () => {
//       const { username, email, password } = {
//         username: "test_user",
//         email: "test@email.com",
//         password: "testPassword",
//       };

//       const req = {
//         body: {
//           username,
//           email,
//           password,
//         },
//       };

//       const res = {};

//       await signUp(req, res);
//       await expect(signUp(req, res)).rejects.toThrow(new Error("Email already registered"));
//     }, { timeout: 10000 });
//   });

//   describe("signIn", () => {
//     it("should return the user object if the credentials are valid", async () => {
//       const { username, email, password } = {
//         username: "test_user",
//         email: "test@email.com",
//         password: "testPassword",
//       };

//       const req = {
//         body: {
//           username,
//           email,
//           password,
//         },
//       };

//       const res = {};

//       await signUp(req, res);
//       const expectedUser = {
//         _id: "",
//         username,
//         email,
//         password,
//       };
//       const actualUser = await signIn(req, res);
//       expect(actualUser).toEqual(expectedUser);
//     });

//     it("should not return the user object if the credentiald are invalid", async () => {
//       const { username, email, password } = {
//         username: "test_user",
//         email: "test@email.com",
//         password: "testPassword",
//       };

//       const req = {
//         body: {
//           username,
//           email,
//           password,
//         },
//       };

//       const res = {};

//       await expect(signUp(req, res)).rejects.toEqual(new Error("Invalid Credentials"));
//     });
//   });


//   describe("toggleFavorite", () => {
//     it("should add the content to the user's favorites list if it is not already there", async () => {
//       const userId = "1234567890";
//       const contentId = "1234567890";
//       const user = new User({
//         id: userId,
//         favoritesList: []
//       });
//       await user.save();
//       await toggleFavorite(req,res);
//       const expectFavoritesList = [contentId];
//       expect(user.favoritesList).toEqual(expectFavoritesList);
//     });

//     it("should remove the content from the user's favorites list if it is already there", async () => {
//       const userId = "1234567890";
//       const contentId = "1234567890";
//       const user = new User({
//         _id: userId,
//         favoritesList: [contentId],
//       });
//       await user.save();
//       await toggleFavorite(req, res);
//       const expectedFavoritesList = [];
//       expect(user.favoritesList).toEqual(expectedFavoritesList);
//     });
//   });
// });

// import supertest from "supertest";
// import app from "../index.js";
// import User from "../models/UserModel.js";
// import {
//   signUp,
//   signIn,
//   toggleFavorite,
//   toggleWatchList,
// } from "./userController.js";
// import bcrypt from "bcryptjs";
// import { generateToken } from "../utils.js";

// // Mock mongoose's User model methods
// jest.mock("../models/UserModel.js");

// // Mock bcrypt methods
// jest.mock("bcryptjs", () => ({
//   hashSync: jest.fn(() => "hashedpassword"),
//   compareSync: jest.fn(() => true),
// }));

// // Mock your token utility
// jest.mock("../utils.js", () => ({
//   generateToken: jest.fn(() => "test_token"),
//   isAuth: jest.fn((req,res,next) => next())
// }));



// const request = supertest(app);

// describe("userController", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("signUp", () => {
//     it("should sign up a new user", async () => {
//       const userData = {
//         _id:"mockUserId",
//         username: "testuser",
//         email: "test@example.com",
//         password: "password123",
//         favoritesList: [],
//         watchList: [],
//       };

//       // User.mockReturnValueOnce(userData);
//       // User.prototype.save = jest.fn().mockResolvedValue(userData);
//       User.mockImplementation(() => ({
//         ...userData,
//         save: jest.fn().mockResolvedValue(userData)
//       }));

//       const response = await request.post("/api/users/signup").send(userData);

//       expect(response.status).toBe(200);
//       expect(response.body).toEqual({
//         _id: userData._id,
//         username: userData.username,
//         email: userData.email,
//         favoritesList: userData.favoritesList,
//         watchList: userData.watchList,
//         token: "test_token",
//       });
//     });
//   });

//   describe("signIn", () => {

//     const userData = {
//       _id: "mockUserId",
//       username: "testuser",
//       email: "test@example.com",
//       password: "password123",
//       favoritesList: [],
//       watchList: [],
//     };

//     afterEach(() => {
//       jest.clearAllMocks();
//     });
    
//     it("should sign in an existing user", async () => {
//       User.findOne = jest.fn().mockResolvedValue(userData);

//       const response = await request.post("/api/users/signin").send({
//         email: userData.email,
//         password: userData.password,
//       });
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual({
//           user: {
//               _id: userData._id,
//               username: userData.username,
//               email: userData.email,
//               favoritesList: userData.favoritesList,
//               watchList: userData.watchList,
//           },
//           token: "test_token",
//       });
//     });

//     it("should return 401 for invalid credentials", async () => {
        
//         User.findOne = jest.fn().mockResolvedValue(null);

//         const response = await request.post("/api/users/signin").send({
//           email: userData.email,
//           password: "wrongPassword",
//         });
//         expect(response.status).toBe(401);
//         expect(response.text).toBe("Invalid Credentials");
//     });
//   });
  
//   describe("toggle favorites",() => {
//     it("should add a content ID to the favorites list if it does not exist", async () => {
//       const userId = "mockUserId";
//       const contentId = 'mockContentId';

//       const mockUser = {
//         _id: userId,
//         favoritesList: [],
//         save: jest.fn().mockImplementation(function() {
//           this.favoritesList.push(contentId);
//           return Promise.resolve(this);
//         }),
//         populate: jest.fn().mockResolvedValue(),
//       };

//       User.findById = jest.fn().mockResolvedValue(mockUser);

//       const response = await request.post(`/api/users/toggle-favorite/${contentId}`).set("user",userId).send();

//       expect(response.status).toBe(200);
//       expect(response.body).toEqual({favoritesList: [contentId]});
//     })
//     //add more later
//   });

//   describe("toggle Watch list", () => {
//     it("should add a content ID to the watch list if it does not exist", async () => {
//       const userId = 'mockUserId' ;
//       const contentId = 'mockContentId';

//       const mockUser = {
//         _id: userId,
//         watchedList: [],
//         save:jest.fn().mockImplementation(function (){
//           this.watchedList.push({'content': contentId,'stoppedAt': null})
//           return Promise.resolve(this);
//         }),
//         populate:jest.fn().mockResolvedValue(),
//       };

//       User.findById = jest.fn().mockResolvedValue(mockUser);
      
//       const response = await request.post(`/api/users/toggle-watch/${contentId}`).set("user", userId).send();

//       expect(response.status).toEqual(200);
//       expect(response.body).toEqual({watchList: [{content: contentId, stoppedAt: 0}]});
//     });

//     //add more later
//   })
// });
