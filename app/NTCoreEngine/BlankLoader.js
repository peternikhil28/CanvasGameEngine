/**
 * Created by Nikhil Peter on 04-11-2017.
 */

let BlankLoader =
{
    load()
    {
        NTEngine.loader.loadResource(initResources, this.loadingComplete.bind(this));
    },

    loadingComplete()
    {
        let loader = document.getElementById("loader");
        loader.remove();

        NTEngine.init();
    }
};