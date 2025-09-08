import { Action } from "../../internal/Action.js";
import { ContrastActionModel } from "../../internal/models/IAdjustActionModel.js";
import { IActionModel } from "../../internal/models/IActionModel.js";
/**
 * @description Adjusts the contrast of the image.
 * @memberOf Actions.Adjust
 * @extends SDK.Action
 */
declare class ContrastAction extends Action {
    private levelValue;
    private functionTypeValue;
    protected _actionModel: ContrastActionModel;
    constructor(level?: number);
    /**
     * @description Sets the level of contrast.
     * @param {number} level The level of contrast.
     *                       Range (sigmoidal): -100 to 100. Default: 0.
     *                       Range (linear): 1 to 200. Default: 100.
     */
    level(level: number): this;
    /**
     * @description Sets the function type for the contrast effect.
     * @param {string} functionType The function to use for the contrast effect.
     *                              Possible values: 'sigmoidal' (default), 'linear'
     */
    functionType(functionType: 'sigmoidal' | 'linear' | string): this;
    protected prepareQualifiers(): this;
    static fromJson(actionModel: IActionModel): ContrastAction;
}
export { ContrastAction };
