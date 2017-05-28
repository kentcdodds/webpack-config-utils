const concurrent = require('nps-utils').concurrent
const rimraf = require('nps-utils').rimraf
const series = require('nps-utils').series

module.exports = {
  scripts: {
    commit: {
      description: 'This uses commitizen to help us generate well formatted commit messages',
      script: 'git-cz',
    },
    test: {
      default: {
        script: 'cross-env NODE_ENV=test nyc ava',
      },
      watch: {
        description: 'Run AVA in watch mode',
        script: 'ava -w --require babel-register',
      },
    },
    build: {
      description: 'delete the dist directory and run babel to build the files',
      script: series(rimraf('dist'), 'babel --copy-files --out-dir dist --ignore *.test.js src'),
    },
    lint: {
      description: 'lint the entire project',
      script: 'eslint .',
    },
    reportCoverage: {
      description: 'Report coverage stats to codecov. This should be run after the `test` script',
      script: 'codecov',
    },
    release: {
      description: 'We automate releases with semantic-release. This should only be run on travis',
      script: series('semantic-release pre', 'npm publish', 'semantic-release post'),
    },
    validate: {
      description: 'This runs several scripts to make sure things look good before committing or on clean install',
      script: concurrent.nps('lint', 'build', 'test'),
    },
    addContributor: {
      description: 'When new people contribute to the project, run this',
      script: 'all-contributors add',
    },
    generateContributors: {
      description: 'Update the badge and contributors table',
      script: 'all-contributors generate',
    },
  },
  options: {
    silent: false,
  },
}
