import { IActionModel } from "./IActionModel.js";
interface ICoordinates {
    x: number;
    y: number;
}
export interface IDistortActionModel extends IActionModel {
    actionType: "distort";
    topLeft: ICoordinates;
    topRight: ICoordinates;
    bottomRight: ICoordinates;
    bottomLeft: ICoordinates;
}
export {};
