after "deploy:updated", "node:install"
after "deploy:updated", "node:build"
after "deploy:published", "node:restart"

namespace :node do
  desc "Install node modules"
  task :install do
    on roles(:app) do
      within release_path do
        with NODE_ENV: 'development' do
          execute :npm, "install"
        end
      end
    end
  end

  desc "Build node modules"
  task :build do
    on roles(:app) do
      within release_path do
        execute :npm, "run", "build"
        execute :npm, "run", "db:migrate"
      end
    end
  end

  task :restart do
    on roles(:app) do
      within release_path do
        execute :pm2, "delete", "ecosystem.config.cjs"
        execute :pm2, "start", "ecosystem.config.cjs"
      end
    end
  end
end
