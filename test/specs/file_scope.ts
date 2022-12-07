/// <reference types="cypress" />

import "mocha";

import { expect } from "chai";

import { generateConfig, resetConfig, tagify } from "../helpers/tagify";

describe("Enum tags", function () {
  let output: string[] = [];
  let config = generateConfig();

  beforeEach(() => {
    resetConfig(config);
  });

  describe('Run tests with no describe tag', () => {
    before(async () => {
      output = await tagify(config, 'file_scope');
    });

    it('should output all tests without tags', function () {
      expect(output).to.deep.equal([
        "describe('Run tests with no describe tag', () => {",
        "    it('I am case1', () => { });",
        "    it('I am case2', () => { });",
        "    it.skip('I should always be skipped', () => { });",
        "});",
        "describe('Run case3 with describe tag', () => {",
        "    it('I am a regular test', () => { });",
        "    it('I am a regular test2', () => { });",
        "    it.skip('I should always be skipped', () => { });",
        "});",
        "describe('Run tests with no tags', () => {",
        "    it('I am case4', () => { });",
        "    it('I am case5', () => { });",
        "});",
      ]);
    });
  });
  
  describe('Run tests with tags provided', () => {
    before(async () => {
      config.env.CYPRESS_INCLUDE_TAGS = "case1";
      output = await tagify(config, 'file_scope');
    });

    it('should output cases with case1', function () {
      expect(output).to.deep.equal([
        "describe('Run tests with no describe tag', () => {",
        "    it('I am case1', () => { });",
        "    ;",
        "    ;",
        "});",
        "describe('Run case3 with describe tag', () => {",
        "    ;",
        "    ;",
        "    ;",
        "});",
        "describe('Run tests with no tags', () => {",
        "    ;",
        "    ;",
        "});",
      ]);
    });
  });

  describe('Run tests with tags provided & file scope', () => {
    before(async () => {
      config.env.CYPRESS_INCLUDE_TAGS = "case1";
      config.env.CYPRESS_USE_FILE_EXEC_SCOPE = true;
      output = await tagify(config, 'file_scope');
    });

    it('should output all cases', function () {
      expect(output).to.deep.equal([
        "describe('Run tests with no describe tag', () => {",
        "    it('I am case1', () => { });",
        "    it('I am case2', () => { });",
        "    it.skip('I should always be skipped', () => { });",
        "});",
        "describe('Run case3 with describe tag', () => {",
        "    it('I am a regular test', () => { });",
        "    it('I am a regular test2', () => { });",
        "    it.skip('I should always be skipped', () => { });",
        "});",
        "describe('Run tests with no tags', () => {",
        "    it('I am case4', () => { });",
        "    it('I am case5', () => { });",
        "});",
      ]);
    });
  });

  describe('Run tests with tags ', () => {
    before(async () => {
      config.env.CYPRESS_INCLUDE_TAGS = "case3";
      output = await tagify(config, 'file_scope');
    });

    it('should output all tests without tags', function () {
      expect(output).to.deep.equal([
        "describe('Run tests with no describe tag', () => {",
        "    ;",
        "    ;",
        "    ;",
        "});",
        "describe('Run case3 with describe tag', () => {",
        "    it('I am a regular test', () => { });",
        "    it('I am a regular test2', () => { });",
        "    it.skip('I should always be skipped', () => { });",
        "});",
        "describe('Run tests with no tags', () => {",
        "    ;",
        "    ;",
        "});",
      ]);
    });
  });

  describe('Run tests with tags provided', () => {
    before(async () => {
      config.env.CYPRESS_INCLUDE_TAGS = "case2,case3";
      output = await tagify(config, 'file_scope');
    });

    it('should output all tests without tags', function () {
      expect(output).to.deep.equal([
        "describe('Run tests with no describe tag', () => {",
        "    ;",
        "    it('I am case2', () => { });",
        "    ;",
        "});",
        "describe('Run case3 with describe tag', () => {",
        "    it('I am a regular test', () => { });",
        "    it('I am a regular test2', () => { });",
        "    it.skip('I should always be skipped', () => { });",
        "});",
        "describe('Run tests with no tags', () => {",
        "    ;",
        "    ;",
        "});",
      ]);
    });
  });

});
