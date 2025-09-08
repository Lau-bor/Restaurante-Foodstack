import { Action } from "../../internal/Action.js";
import { IActionModel } from "../../internal/models/IActionModel.js";
import { IDisplaceActionModel } from "../../internal/models/IDisplaceActionModel.js";
import { BaseSource } from "../../qualifiers/source/BaseSource.js";
import { ITransformationFromJson } from "../../internal/models/IHasFromJson.js";
import { Position } from "../../qualifiers/position.js";
/**
 * @description Displaces the pixels in an image according to the color channels of the pixels in another specified image.
 * @extends SDK.Action
 * @memberOf Actions.Reshape
 * @see Visit {@link Actions.Reshape| Reshape} for examples
 */
declare class DisplaceAction extends Action {
    protected _actionModel: IDisplaceActionModel;
    private _x?;
    private _y?;
    private source;
    constructor(source: BaseSource);
    /**
     * @description Sets the x coordinate for displacement.
     * @param {string | number} x The x coordinate value (between -999 and 999)
     * @return {this}
     */
    x(x: string | number): this;
    /**
     * @description Sets the y coordinate for displacement.
     * @param {string | number} y The y coordinate value (between -999 and 999)
     * @return {this}
     */
    y(y: string | number): this;
    /**
     * @description Sets the position using Position qualifier (alternative to x/y methods).
     * @param {Position} position The position qualifier
     * @return {this}
     */
    position(position: Position): this;
    static fromJson(actionModel: IActionModel, transformationFromJson?: ITransformationFromJson): DisplaceAction;
    toString(): string;
}
export { DisplaceAction };
