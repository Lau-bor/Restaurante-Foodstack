'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../tslib.es6-7a681263.cjs');
var internal_Action = require('../../internal/Action.cjs');
var internal_qualifier_QualifierValue = require('../../internal/qualifier/QualifierValue.cjs');
var internal_qualifier_Qualifier = require('../../internal/qualifier/Qualifier.cjs');
require('../../qualifiers/flag/FlagQualifier.cjs');
require('../../internal/utils/dataStructureUtils.cjs');
require('../../internal/models/ActionModel.cjs');
require('../../internal/models/actionToJson.cjs');
require('../../internal/utils/unsupportedError.cjs');
require('../../internal/models/QualifierModel.cjs');
require('../../internal/models/qualifierToJson.cjs');

/**
 * @description Adjusts the contrast of the image.
 * @memberOf Actions.Adjust
 * @extends SDK.Action
 */
var ContrastAction = /** @class */ (function (_super) {
    tslib_es6.__extends(ContrastAction, _super);
    function ContrastAction(level) {
        var _this = _super.call(this) || this;
        _this._actionModel = { actionType: 'contrast' };
        if (level !== undefined) {
            _this.level(level);
        }
        return _this;
    }
    /**
     * @description Sets the level of contrast.
     * @param {number} level The level of contrast.
     *                       Range (sigmoidal): -100 to 100. Default: 0.
     *                       Range (linear): 1 to 200. Default: 100.
     */
    ContrastAction.prototype.level = function (level) {
        this.levelValue = level;
        this._actionModel.level = level;
        return this;
    };
    /**
     * @description Sets the function type for the contrast effect.
     * @param {string} functionType The function to use for the contrast effect.
     *                              Possible values: 'sigmoidal' (default), 'linear'
     */
    ContrastAction.prototype.functionType = function (functionType) {
        this.functionTypeValue = functionType;
        this._actionModel.functionType = functionType;
        return this;
    };
    ContrastAction.prototype.prepareQualifiers = function () {
        var qualifierValueStr = 'contrast';
        if (this.levelValue !== undefined) {
            if (this.functionTypeValue) {
                // If function type is specified, use the level_ prefix format
                qualifierValueStr += ":level_" + this.levelValue;
            }
            else {
                // If no function type, use simple format
                qualifierValueStr += ":" + this.levelValue;
            }
        }
        if (this.functionTypeValue) {
            qualifierValueStr += ";type_" + this.functionTypeValue;
        }
        var qualifierValue = new internal_qualifier_QualifierValue.QualifierValue(qualifierValueStr);
        this.addQualifier(new internal_qualifier_Qualifier.Qualifier('e', qualifierValue));
        return this;
    };
    ContrastAction.fromJson = function (actionModel) {
        var _a = actionModel, level = _a.level, functionType = _a.functionType;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        var result = new this(level);
        if (functionType) {
            result.functionType(functionType);
        }
        return result;
    };
    return ContrastAction;
}(internal_Action.Action));

exports.ContrastAction = ContrastAction;
