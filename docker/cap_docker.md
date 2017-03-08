### cap & docker结合
```
# be sure to comment out the require 'capistrano/deploy' line in your Capfile!

# config valid only for Capistrano 3.1
lock '3.2.1'

set :application, 'my-cool-application'

# the base docker repo reference
set :name, "johns-stuff/#{fetch(:application)}"

# i have a docker registry running on a remote machine.
set :remote_repo, "registry.from.dev.machine:5000/#{fetch(:name)}"
set :local_repo, "registry.from.install.machine:5000/#{fetch(:name)}"

desc 'Build Docker images'
task :build do
  # do you app pre-deploy stuff here. i use gulp, so...
  system "gulp build"

  # build the actual docker image, tagging the push for the remote repo
  system "docker build -t #{fetch(:remote_repo)} ."
end

desc 'Push Docker images'
task :push do
  system "docker push #{fetch(:remote_repo)}"
end

desc 'go'
task :go => ['build', 'push', 'deploy']

desc 'deploy'
task :deploy do
  on roles(:app) do
    execute "docker pull #{fetch(:local_repo)}"
    Rake::Task['deploy:restart'].invoke
  end
end

namespace :deploy do
  task :restart do
    on roles(:app) do
      # in case the app isn't running on the other end
      execute "docker stop #{fetch(:application)} ; true"

      # have to remove it otherwise --restart=always will run it again on reboot!
      execute "docker rm #{fetch(:application)} ; true"

      # modify this to suit how you want to run your app
      execute "docker run -d -p 3000:3000 --restart=always --name=#{fetch(:application)} #{fetch(:local_repo)}"
    end
  end
end
```