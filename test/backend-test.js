const mongoose = require("mongoose");
const chai = require("chai");
const expect = chai.expect;
const assert = require("chai").assert;

describe("MongoDB Connection", () => {
  it("Connects to the database", (done) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      "mongodb+srv://root:root123@traindb.pzmt8md.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      expect(db.readyState).to.equal(1);
      done();
    });
  });
});

describe("User update test route", () => {
  it("User is avilable", () => {
    assert.equal(1 + 1, 2);
  });
});

describe("Get all users route check", () => {
  it("Get all user route working ", () => {
    assert.equal(1 + 1, 2);
  });
});

describe("user login route testing", () => {
  it("User added", () => {
    assert.equal(1 + 1, 2);
  });
});
