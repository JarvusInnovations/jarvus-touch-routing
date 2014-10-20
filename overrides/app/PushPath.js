/* jshint undef: true, unused: true, browser: true, quotmark: single, curly: true */
/* global Ext */
Ext.define('Jarvus.touch.override.app.PushPath', {
    override: 'Ext.app.Controller',
    requires: [
        'Jarvus.touch.override.app.EncodedPaths',
        'Ext.app.Action'
    ],

    /**
     * Silently push a given path to the address bar without triggering a routing event.
     * This is useful to call after a user has _already_ entered a UI state and the current address
     * _may_ need to be synchronized. If the given path was already in the address bar this method
     * has no effect.
     *
     * @param {String/String[]/Ext.data.Model} url The url path to push
     */
    pushPath: function(url) {
        var app = this.getApplication();

        url = app.encodePath(url);

        app.getHistory().add(Ext.create('Ext.app.Action', {
            url: url
        }), true);

        app.fireEvent('urlpush', url);
    },

    /**
     * @deprecated
     */
    pushUrl: function(url) {
        //<debug>
        Ext.Logger.deprecate('app.pushUrl is deprecated, use Controller.pushPath instead');
        //</debug>

        this.pushPath(url);
    }
});