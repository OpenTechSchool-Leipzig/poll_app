module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
          @import "@/scss/_tooltips.scss";
          @import "./node_modules/bulma/bulma.sass";
        `,
      },
    },
  },
};
