/**
 * Created by Nikhil Peter on 03-11-2017.
 */

let NTEngine = {};

NTEngine.canvas = null;
NTEngine.scene = null;

NTEngine.root = null;

NTEngine.loader = NTEngine.loader || new NTLoader();

NTEngine.screenManager = NTEngine.screenManager || new NTScreenManager();

NTEngine.listener = NTEngine.listener || new NTEventHandler();

NTEngine.server = NTEngine.server || new NTServer();