export const parseButton = (button) => {
  console.log("parseButton", button);
  return {
    label: button.primary_label,
    extraLabel: button.secondary_label,
    type: button.type,
    link: button.link,
    buttonId: button.object_id,
  };
};
