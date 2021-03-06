const app = require("../index");
const { capitaliseFirst } = require("../helpers");

const chai = require("chai");
const chaiHttp = require("chai-http");

const options = ["followers", "following", "likes"];

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Twitter", () => {
  options.forEach(function(option) {
    describe(`${capitaliseFirst(option)} - @noradio`, () => {
      let path = `/twitter/${option}/noradio`;
      it(`GET ${path}`, done => {
        chai
          .request(app)
          .get(path)
          .end((err, res) => {
            res.should.have.status(200);
            chai.expect(res.body).to.include({
              schemaVersion: 1,
              label: option,
              color: "blue"
            });
            chai.expect(res.body.message).to.be.a("string");
            done();
          });
      });
    });
  });
});
