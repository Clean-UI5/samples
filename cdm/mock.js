sap.ui.require([
  'sap/ui/thirdparty/sinon-4',
  'samples/applications/gstate/Component'
], function (sinon, gstate) {
  const xhr = sinon.useFakeXMLHttpRequest();
  sinon.FakeXMLHttpRequest.useFilters = true;
  sinon.FakeXMLHttpRequest.addFilter((verb, url) => !url.includes('/mock/'));

  const components = {
    gstate
  };

  const server = sinon.fakeServer.create();
  server.autoRespond = true;
  server.respondWith('GET', /\/mock\/(\w+)/, function (request, name) {
    request.respond(200, {
      'Content-Type': 'application/json'
    }, JSON.stringify({
      d: {
        number: components[name].getMockData()
      }
    }));
  });
});
