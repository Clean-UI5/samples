sap.ui.define([
  'samples/util/BaseController',
  'samples/util/messageBox',
  'samples/util/asyncEventHandler',
  'sap/m/MessageBox'
], function (BaseController, messageBox, asyncEventHandler, MessageBox) {
  return BaseController.extend('samples.applications.msgbox.controller.Main', {
    onInfo: asyncEventHandler(async function () {
      await messageBox(await this.i18n('btn.info.message'));
    }),

    onError: asyncEventHandler(async function () {
      await messageBox(await this.i18n('btn.error.message'), {
        icon: MessageBox.Icon.ERROR
      });
    }),

    onQuestion: asyncEventHandler(async function () {
      const answer = await messageBox(await this.i18n('btn.question.message'), {
        icon: sap.m.MessageBox.Icon.QUESTION,
        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
        emphasizedAction: MessageBox.Action.YES
      });
      await messageBox(answer || await this.i18n('btn.question.no-answer'), {
        title: await this.i18n('btn.question.answer')
      });
    })
  });
});
