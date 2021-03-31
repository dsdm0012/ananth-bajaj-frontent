set :stage, :production
server '88.99.140.158', user: 'deploy', roles: [:web, :app], primary: true

# Don't change these unless you know what you're doing
set :pty,             true
set :use_sudo,        false
set :stage,           :production
set :deploy_via,      :remote_cache
set :deploy_to,       "/home/#{fetch(:user)}/web_ver1/production/#{fetch(:application)}"

set :branch, :master
set :keep_releases, 5

## Defaults:
# set :scm,           :git
# set :format,        :pretty
set :log_level,     :debug

# ## Linked Files & Directories (Default None):
# set :linked_files, %w{config/database.yml config/secrets.yml}
# set :linked_dirs,  %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/assets public/uploads}
set :bundle_binstubs, nil
set :tmp_dir, '/home/deploy/tmp'

 

  # desc 'Seed Database'
  # task :seed do
  #   on roles(:app) do
  #     within "#{current_path}" do
  #       with rails_env: "#{fetch(:stage)}" do
  #         execute :rake, "db:seed"
  #       end
  #     end
  #   end
  # end

  


 
 
  #after  :finishing,    :pm_restart 
  #after  :finishing,    :pm_restart
# server-based syntax
# ======================
# Defines a single server with a list of roles and multiple properties.
# You can define all roles on a single server, or split them:

# server "example.com", user: "deploy", roles: %w{app db web}, my_property: :my_value
# server "example.com", user: "deploy", roles: %w{app web}, other_property: :other_value
# server "db.example.com", user: "deploy", roles: %w{db}



# role-based syntax
# ==================

# Defines a role with one or multiple servers. The primary server in each
# group is considered to be the first unless any hosts have the primary
# property set. Specify the username and a domain or IP for the server.
# Don't use `:all`, it's a meta role.

# role :app, %w{deploy@example.com}, my_property: :my_value
# role :web, %w{user1@primary.com user2@additional.com}, other_property: :other_value
# role :db,  %w{deploy@example.com}



# Configuration
# =============
# You can set any configuration variable like in config/deploy.rb
# These variables are then only loaded and set in this stage.
# For available Capistrano configuration variables see the documentation page.
# http://capistranorb.com/documentation/getting-started/configuration/
# Feel free to add new variables to customise your setup.



# Custom SSH Options
# ==================
# You may pass any option but keep in mind that net/ssh understands a
# limited set of options, consult the Net::SSH documentation.
# http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start
#
# Global options
# --------------
#  set :ssh_options, {
#    keys: %w(/home/rlisowski/.ssh/id_rsa),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }
#
# The server-based syntax can be used to override options:
# ------------------------------------
# server "example.com",
#   user: "user_name",
#   roles: %w{web app},
#   ssh_options: {
#     user: "user_name", # overrides user setting above
#     keys: %w(/home/user_name/.ssh/id_rsa),
#     forward_agent: false,
#     auth_methods: %w(publickey password)
#     # password: "please use keys"
#   }
