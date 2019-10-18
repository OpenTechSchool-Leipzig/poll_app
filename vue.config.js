module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/_variables.scss";
          @import "./node_modules/bulma/bulma.sass";
          @import "@/scss/_mixins.scss";
          @import "@/scss/_classes.scss";
          @import "@/scss/_tooltips.scss";
        `,
      },
    },
  },
};
