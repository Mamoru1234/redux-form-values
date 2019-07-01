const {Task} = require('./.dspm/dist/main/Task');

module.exports = (project) => {
  project.getTask('compile')
    .dependsOn('clean');

  const build = new Task('build', project);
  build
    .dependsOn('compile');
  project.setTask('build', build);

  project.getTask('package')
    .fromFile('package.json', {
      version: process.env.TRAVIS_TAG || '0.0.0',
    });

  project.getTask('publish')
    .token(process.env.TRAVIS_NPM_TOKEN);
};
