// For Reference: https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2

require("ts-node/register");
require("jsdom-global/register");

const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });

process.env.NODE_ENV = 'test';
