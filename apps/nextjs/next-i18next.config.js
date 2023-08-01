/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "fr",
    locales: ["en", "fr"],
  },
  localePath: "../../locales",
  localeStructure: "{{lng}}/{{ns}}",
};
