/**
 * Created by mrskull on 24.11.16.
 */


window.EVENTS = {
  define: new Event('define'),
  redirect: new Event('redirect'),

  plugins: {
    close: new Event('plugins_close'),

    reload_sign_in: new Event('plugins_reload_sign_in'),

    reload_header: new Event('plugin_header_reload'),
    reload_navigation: new Event('plugin_navigation_reload'),
    reload_cart: new Event('plugin_cart_reload'),
    reload_searcher: new Event('plugin_searcher_reload'),
    reload_ground: new Event('plugin_ground_reload'),
  },

  dialog_close: new Event('dialog_close'),
};


