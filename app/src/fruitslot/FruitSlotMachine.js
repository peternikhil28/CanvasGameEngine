/**
 * Created by Nikhil Peter on 07-11-2017.
 */

class FruitSlotMachine extends NTSlotMachine
{
    constructor(assetPath, layoutName)
    {
        super(assetPath, layoutName);

        this.BIG_WIN_COUNT = 3;
        this.SMALL_WIN_COUNT = 2;

        this._bonusCount = 0;
    }

    initSlotParams()
    {
        super.initSlotParams();

        NTSlotUtils.NUM_REELS = 3;
        NTSlotUtils.NUM_ROWS = 1;
        NTSlotUtils.SYMBOL_WILD = 0;
        NTSlotUtils.MIN_RECURRENCE_WIN = 2;
    }

    createCustomObject(objectData)
    {
        super.createCustomObject(objectData);

        switch (objectData.type)
        {
            case "Label":
                let fontSize = objectData.name === "Win" ? 50 : 30;
                let label = new NTLabel("Arial", fontSize, objectData.w, objectData.h);
                label.position.set(objectData.x, objectData.y);
                return label;
                break;
        }
    }

    onObjectCreated(object, objectData)
    {
        super.onObjectCreated(object, objectData);

        switch (objectData.name)
        {
            case "Bonus":
                object.setLabel("Bonus: ");
                break;

            case "BonusValue":
                object.setLabel("0");
                this._bonusValue = object;
                break;

            case "Win":
                object.setLabel("Start!")
                this._winLabel = object;
                break;
        }
    }

    spinButtonClicked()
    {
        super.spinButtonClicked();

        this._winLabel.setLabel("");
    }

    onSpinCompleted()
    {
        super.onSpinCompleted();

        let result = this._result;
        this.setWinType(result.winDetails.length===0 ? 0 : result.winDetails[0].numRecurrence);

        if(result.bonus)
            this.setBonus();
    }

    setWinType(symbolRecurrence)
    {
        let winType;
        switch (symbolRecurrence)
        {
            case this.BIG_WIN_COUNT :
                winType = "Big Win!";
                break;

            case this.SMALL_WIN_COUNT :
                winType = "Small Win!";
                break;

            default :
                winType = "No Win";
                break;
        }

        this._winLabel.setLabel(winType);
    }

    setBonus()
    {
        this._bonusValue.setLabel(++this._bonusCount);
    }
}