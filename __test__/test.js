const request = require("supertest");
const express = require("express");


jest.setTimeout(100000);
const app = express();
app.use(express.urlencoded());

describe("Get users", () => {
  test("get employees with a non-supervisor login", async () => {
    request(app)
      .get("/api/v1/users/employees")
      .set("Authorization", "Bearer euiewhewuyweujhwehiweyh")
      .expect({
        message: "Error Processing request",
        code: 500,
      });
  });

  test("non-supervisor users add a product category", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTAwMjZlZTgxODljNjk4NDdkNTYyNSIsInJvbGUiOiJFbXBsb3llZSIsImVtYWlsIjoiZGV2ZGFiaXJpQGdtYWlsLmNvbSIsImlhdCI6MTYyNTM0OTM3MiwiZXhwIjoxNjI1MzU2NTcyfQ.q9jXctF8cOktRSfTpz2L3Oo3Dy1XuUYFZZuqI5pPYhQ";
    request(app)
      .post("/api/v1/product-category")
      .set("Authorization", `Bearer ${token}`)
      .send({ category: "Laptop" })
      .expect({
        message: "You are not authorised to access this route",
        code: 400,
      });
  });


  
});
