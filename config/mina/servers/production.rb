task :production do

  set :domain,          'do_sbjs'

  set :app_server_name, "#{app}"

  set :app_domain,      'isomorphic-comments.alexfedoseev.com'
  set :app_api_domain,  "api.#{app_domain}"
  set :app_sys_id,      "#{app}-#{app_part}"

end
