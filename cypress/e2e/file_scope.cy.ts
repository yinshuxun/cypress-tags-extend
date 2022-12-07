/// <reference path='../../dist/index.d.ts' />

// sample start
describe('Run tests with no describe tag', () => {
  it(['case1'],'I am case1', () => {});
  it(['case2'],'I am case2', () => {});
  it.skip('I should always be skipped', () => {});
});

describe(['case3'],'Run case3 with describe tag', () => {
  it('I am a regular test', () => {});
  it(['case4'],'I am a regular test2', () => {});
  it.skip('I should always be skipped', () => {});
});

describe('Run tests with no tags', () => {
  it('I am case4', () => {});
  it('I am case5', () => {});
});
// sample end
