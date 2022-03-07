sap.ui.define([
  'sap/ui/core/Fragment'
], function (Fragment) {
  return function xfrag (xmlContent) {
    return Fragment.load({
      type: 'XML',
      definition: `
<core:FragmentDefinition
  xmlns:core="sap.ui.core"
>
  ${xmlContent}
</core:FragmentDefinition>`
    });
  };
});
