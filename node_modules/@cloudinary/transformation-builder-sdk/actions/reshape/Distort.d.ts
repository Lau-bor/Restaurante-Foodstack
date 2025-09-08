import { Action } from "../../internal/Action.js";
import { IActionModel } from "../../internal/models/IActionModel.js";
import { IDistortActionModel } from "../../internal/models/IDistortActionModel.js";
export declare type IDistortCoordinates = [number, number, number, number, number, number, number, number];
/**
 * @description Distorts the image to a new shape by adjusting its corners to achieve perception warping.
 * Specify four corner coordinates, representing the new coordinates for each of the image's four corners,
 * in clockwise order from the top-left corner.
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/transformation_reference#e_distort|Distorting images}
 * @param {number[]} coordinates - Four x/y pairs representing the new image corners
 * @extends SDK.Action
 * @memberOf Actions.Reshape
 * @see Visit {@link Actions.Reshape| Reshape} for examples
 */
declare class DistortAction extends Action {
    protected _actionModel: IDistortActionModel;
    constructor(coordinates: IDistortCoordinates);
    static fromJson(actionModel: IActionModel): DistortAction;
}
export { DistortAction };
