'use strict';

module.exports = {
  types: [
    {
      value: 'build',
      name: 'build: A change that affects the build system or external dependencies'
    },
    {
      value: 'docs',
      name: 'docs: A change that only affects documentation'
    },
    {
      value: 'feat',
      name: 'feat: A new feature'
    },
    {
      value: 'fix',
      name: 'fix: A bug fix'
    },
    {
      value: 'perf',
      name: 'perf: A change that improves performance'
    },
    {
      value: 'refactor',
      name: 'refactor: A change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'revert',
      name: 'revert: A change that reverts to a previous commit'
    },
    {
      value: 'style',
      name: 'style: A change that does not affect the meaning of the code'
    },
    {
      value: 'test',
      name: 'test: A change that adds missing tests or corrects existing tests'
    }
  ],

  scopes: [
    {
      name: 'array'
    },
    {
      name: 'map'
    }
  ],

  messages: {
    type: 'Type:',
    scope: 'Scope (use empty for changes which affect multiple scopes):',
    subject: 'Subject (use the imperative, present tense, don\'t capitalize the first letter and no dot at the end):\n',
    body: 'Description (optional):\n',
    breaking: 'Breaking Change (optional):\n',
    footer: 'Issue Closed (optional):\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },

  allowBreakingChanges: ['feat', 'fix'],
  allowCustomScopes: true,
  appendBranchNameToCommitMessage: false,
  breakingPrefix: 'BREAKING CHANGE:\n',
  footerPrefix: 'Closes'
};
