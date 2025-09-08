import { IActionModel } from "./IActionModel.js";
interface ImproveActionModel extends IActionModel {
    mode?: string;
    blend?: number;
}
interface ContrastActionModel extends IActionModel {
    level?: number;
    functionType?: string;
}
export { ImproveActionModel, ContrastActionModel };
