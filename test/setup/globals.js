import chai from 'chai';
import injectr from 'injectr';
import { spy, stub } from 'sinon';
import sinonChai from 'sinon-chai';
import { transform } from 'babel-core';

injectr.onload = (filename, content) =>
  transform(content, {
    filename,
  }).code;

chai.use(sinonChai);

global.spy = spy;
global.stub = stub;
global.expect = chai.expect;
global.injectr = injectr;
