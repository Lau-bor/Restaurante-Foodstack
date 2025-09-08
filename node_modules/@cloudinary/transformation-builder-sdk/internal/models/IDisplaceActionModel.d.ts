import { IActionModel } from "./IActionModel.js";
import { ISourceModel } from "./ISourceModel.js";
export interface IDisplaceActionModel extends IActionModel {
    actionType: "displace";
    source: ISourceModel;
    x?: string | number;
    y?: string | number;
}
