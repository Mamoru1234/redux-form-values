const {ArchiveTask} = require('./.dspm/dist/main/tasks/ArchiveTask');
const {CmdTask} = require('./.dspm/dist/main/tasks/CmdTask');
const {Task} = require('./.dspm/dist/main/Task');

module.exports = (project) => {
  project.getTask('compile')
    .dependsOn('clean');

  const build = new Task('build', project);
  build
    .dependsOn('compile');
  project.setTask('build', build);

  CmdTask.create(project, 'npmCompile')
    .dependsOn('clean')
    .command('npm run compile');

  project.getTask('package')
    .dependsOn('npmCompile')
    .fromFile('package.json', {
      version: process.env.TRAVIS_TAG || '0.0.0',
    });

  ArchiveTask.create(project, 'archive')
    .from('./build/module', {
      map: function(header) {
        header.name = 'package/'+header.name;
        return header;
      },
    })
    .dependsOn('package')
    .into('./build/redux-form-values.tgz');

  project.getTask('publish')
    .token(process.env.TRAVIS_NPM_TOKEN);
};
