sap.ui.define([
  'samples/util/BaseController',
  'samples/util/controllerCompose',
  './Main/common',
  './Main/part1',
  './Main/part2'
// eslint-disable-next-line max-params
], function (BaseController, controllerCompose, common, part1, part2) {
  return BaseController.extend('samples.applications.ctlcmp.controller.Main',
    controllerCompose(common, part1, part2)
  );
});
