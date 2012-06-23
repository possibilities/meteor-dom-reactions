Package.describe({
  summary: "An experimental tool for learning about DOM reactions in Meteor"
});

Package.on_use(function (api) {
  api.add_files('client.js', 'client');
});
