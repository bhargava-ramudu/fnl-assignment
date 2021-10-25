const request = require("supertest");
const City = require("../../models/City");

let server;

describe("/api/cities", () => {
  beforeEach(() => {
    server = require("../../app").listen(4000);
  });
  afterEach(async () => {
    server.close();
    await City.deleteMany({});
  });
  describe("POST /api/cities", () => {
    it("should insert/update city and its weather data", (done) => {
      request(server)
        .post("/api/cities")
        .send({ city: "london" })
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.msg).toBe(`City data updated Successfully`);
          expect(response.body.data.city.name).toBe("london");
          expect(response.body.data.weatherDataList.length).toBe(40);
          done();
        });
    });
  });

  describe("GET /api/cities", () => {
    it("should get weather data of all cities", async () => {
      let requests = [
        request(server).post("/api/cities").send({ city: "london" }),
        request(server).post("/api/cities").send({ city: "peru" }),
      ];

      const responses = await Promise.all(requests);
      const res = await request(server).get("/api/cities");
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(
        res.body.data.some((citydata) => citydata.city.name == "london")
      ).toBeTruthy();
      expect(
        res.body.data.some((citydata) => citydata.city.name == "peru")
      ).toBeTruthy();
    });
  });
});
