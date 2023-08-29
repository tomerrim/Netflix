import Content from "../models/contentModel.js";
import { getAllContent, getAllMovies, getAllSeries, getContentById } from "./contentController.js";

// const content = jest.mock("mongoose.model", {
//     strict: false,
//     returns: {
//         create: jest.fn(() => {
//             return {
//               _id: "1234567890",
//               title: "Test Content",
//               description: "this is a test content",
//               genre: "Action",
//               limit: 10,
//               year: 2023,
//               duration: 120,
//               movie: "The Batman",
//               trailer: "https://www.youtube.com/watch?v=g6t72yO00lI",
//               imgVertical: "https://image.tmdb.org/t/p/w500/g6t72yO00lI",
//               imgThumb: "https://image.tmdb.org/t/p/w150/g6t72yO00lI",
//               imgTitle: "The Batman",
//               img: "https://image.tmdb.org/t/p/original/g6t72yO00lI",
//               isSeries: false,
//             };
//         }),
//     },
// });

// jest.mock("../models/contentModel.js");

// Content.find = jest.fn();
// Content.findById = jest.fn();
// Content.create = jest.fn();

// describe("contentController", () => {

//     beforeAll(() => {
//         Content.find.mockResolvedValue([{
//             _id: "1234567890",
//             title: "Test Content",
//             description: "this is a test content",
//             genre: "Action",
//             limit: 10,
//             year: 2023,
//             duration: 120,
//             movie: "The Batman",
//             trailer: "https://www.youtube.com/watch?v=g6t72yO00lI",
//             imgVertical: "https://image.tmdb.org/t/p/w500/g6t72yO00lI",
//             imgThumb: "https://image.tmdb.org/t/p/w150/g6t72yO00lI",
//             imgTitle: "The Batman",
//             img: "https://image.tmdb.org/t/p/original/g6t72yO00lI",
//             isSeries: false,
//         }]);

//         Content.findById.mockResolvedValue([
//           {
//             _id: "1234567890",
//             title: "Test Content",
//             description: "this is a test content",
//             genre: "Action",
//             limit: 10,
//             year: 2023,
//             duration: 120,
//             movie: "The Batman",
//             trailer: "https://www.youtube.com/watch?v=g6t72yO00lI",
//             imgVertical: "https://image.tmdb.org/t/p/w500/g6t72yO00lI",
//             imgThumb: "https://image.tmdb.org/t/p/w150/g6t72yO00lI",
//             imgTitle: "The Batman",
//             img: "https://image.tmdb.org/t/p/original/g6t72yO00lI",
//             isSeries: false,
//           },
//         ]);

//         Content.create.mockResolvedValue([
//           {
//             _id: "1234567890",
//             title: "Test Content",
//             description: "this is a test content",
//             genre: "Action",
//             limit: 10,
//             year: 2023,
//             duration: 120,
//             movie: "The Batman",
//             trailer: "https://www.youtube.com/watch?v=g6t72yO00lI",
//             imgVertical: "https://image.tmdb.org/t/p/w500/g6t72yO00lI",
//             imgThumb: "https://image.tmdb.org/t/p/w150/g6t72yO00lI",
//             imgTitle: "The Batman",
//             img: "https://image.tmdb.org/t/p/original/g6t72yO00lI",
//             isSeries: false,
//           },
//         ]);

        
//     })
//     describe("getAllContent", () => {
//         it(
//           "should return all content", async () => {
//             const mockResponse = () => {
//               const res = {};
//               res.send = jest.fn().mockReturnValue(res);
//               res.sendStatus = jest.fn().mockReturnValue(res);
//               res.status = jest.fn().mockReturnValue(res);
//               return res;
//             };

//             const res = mockResponse();
//             await getAllContent(undefined, res);
//             expect(res.send).toHaveBeenCalledWith([{ _id: "1234567890" }]);
//             // expect(res.body).toEqual([{_id: "1234567890"}]);
//           },
//           { timeout: 10000 }
//         );
//     });

//     describe("getAllMovies", () => {
//         it(
//           "should return all Movies",
//           async () => {
            
//             const res = await getAllMovies();
//             expect(res.body).toEqual([content]);
//           },
//           { timeout: 10000 }
//         );
//     });

//     describe("getContentById", () => {
//         it(
//           "should return the content by id",
//           async () => {
//             const res = await getContentById({ id: content._id });
//             expect(res.body).toEqual(content);
//           },
//           { timeout: 10000 }
//         );
//     });

//     describe("getAllSeries", () => {
//         it(
//           "should return all series",
//           async () => {
//             const series = await Content.create({
//               title: "test series",
//               description: "this is a test series",
//               genre: "Action",
//               limit: 10,
//               year: 2023,
//               duration: 120,
//               movie: "The Batman",
//               trailer: "https://www.youtube.com/watch?v=g6t72yO00lI",
//               imgVertical: "https://image.tmdb.org/t/p/w500/g6t72yO00lI",
//               imgThumb: "https://image.tmdb.org/t/p/w150/g6t72yO00lI",
//               imgTitle: "The Batman",
//               img: "https://image.tmdb.org/t/p/original/g6t72yO00lI",
//               isSeries: true,
//             });
//             const res = await getAllSeries();
//             expect(res.body).toEqual([series]);
//           },
//           { timeout: 10000 }
//         );
//     });
// });