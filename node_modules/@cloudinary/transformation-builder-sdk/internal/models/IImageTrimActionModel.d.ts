import { IActionModel } from "./IActionModel.js";
export interface IImageTrimActionModel extends IActionModel {
    colorSimilarity: number;
    colorOverride: string;
}
