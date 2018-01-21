/**
 * Created by Nikhil Peter on 04-11-2017.
 */

let NTUtils =
{
    createSprite(assetPath, objectData)
    {
        let sprite = new NTSprite(objectData.w, objectData.h);
        sprite.setTexture(assetPath + objectData.name + ".png");
        sprite.setName(objectData.name);
        sprite.position.set(objectData.x, objectData.y);
        return sprite;
    },

    createButton(assetPath, objectData)
    {
        let button = new NTButton(objectData.w, objectData.h);
        button.setTexture(assetPath + objectData.name + ".png");
        button.setName(objectData.name);
        button.position.set(objectData.x, objectData.y);
        return button;
    },

    cloneObject(object)
    {
        return JSON.parse(JSON.stringify(object));
    },

    loadJSON(path, callback)
    {
        let loader = new NTJsonLoader();
        loader.load(path, callback);
    }
};