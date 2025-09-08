import { Action } from "../../internal/Action.js";
import { Qualifier } from "../../internal/qualifier/Qualifier.js";
/**
 * @description Distorts the image to an arc shape.
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/transformation_reference#e_distort|Distorting images}</br>
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#distort|Distortion effects}
 * @param {number} degrees The degrees to arc the image
 * @extends SDK.Action
 * @memberOf Actions.Reshape
 * @see Visit {@link Actions.Reshape| Reshape} for examples
 */
class DistortArcAction extends Action {
    constructor(degrees) {
        super();
        this._actionModel = {
            actionType: 'distortArc',
            degrees: degrees
        };
        this.addQualifier(new Qualifier('e', `distort:arc:${degrees}`));
    }
    static fromJson(actionModel) {
        const { degrees } = actionModel;
        return new DistortArcAction(degrees);
    }
}
export { DistortArcAction };
