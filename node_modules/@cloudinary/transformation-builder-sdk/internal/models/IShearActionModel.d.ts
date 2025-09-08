import { IActionModel } from "./IActionModel.js";
export interface IShearActionModel extends IActionModel {
    skewX: string | number;
    skewY: string | number;
}
