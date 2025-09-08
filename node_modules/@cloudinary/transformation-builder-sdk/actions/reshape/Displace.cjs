'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../tslib.es6-7a681263.cjs');
var internal_Action = require('../../internal/Action.cjs');
var internal_models_createSourceFromModel = require('../../internal/models/createSourceFromModel.cjs');
require('../../qualifiers/flag/FlagQualifier.cjs');
require('../../internal/qualifier/QualifierValue.cjs');
require('../../internal/qualifier/Qualifier.cjs');
require('../../internal/models/QualifierModel.cjs');
require('../../internal/models/qualifierToJson.cjs');
require('../../internal/utils/unsupportedError.cjs');
require('../../internal/utils/dataStructureUtils.cjs');
require('../../internal/models/ActionModel.cjs');
require('../../internal/models/actionToJson.cjs');
require('../../internal/models/IImageSourceModel.cjs');
require('../../qualifiers/source/sourceTypes/ImageSource.cjs');
require('../../qualifiers/source/BaseSource.cjs');
require('../../internal/models/IFetchSourceModel.cjs');
require('../../qualifiers/source/sourceTypes/FetchSource.cjs');
require('../../qualifiers/format/FormatQualifier.cjs');
require('../../internal/utils/base64Encode.cjs');
require('../../qualifiers/source/sourceTypes/VideoSource.cjs');
require('../../internal/models/ITextSourceModel.cjs');
require('../../qualifiers/source/sourceTypes/TextSource.cjs');
require('../../qualifiers/source/sourceTypes/BaseTextSource.cjs');
require('../../qualifiers/textStyle.cjs');
require('../../qualifiers/fontWeight.cjs');
require('../../qualifiers/fontStyle.cjs');
require('../../qualifiers/textDecoration.cjs');
require('../../internal/utils/serializeCloudinaryCharacters.cjs');
require('../../qualifiers/textStroke.cjs');
require('../../internal/models/IStrokeModel.cjs');
require('../../internal/utils/prepareColor.cjs');
require('../../internal/models/createTextStyleFromModel.cjs');
require('../../internal/models/IAudioSourceModel.cjs');
require('../../qualifiers/source/sourceTypes/AudioSource.cjs');

/**
 * @description Displaces the pixels in an image according to the color channels of the pixels in another specified image.
 * @extends SDK.Action
 * @memberOf Actions.Reshape
 * @see Visit {@link Actions.Reshape| Reshape} for examples
 */
var DisplaceAction = /** @class */ (function (_super) {
    tslib_es6.__extends(DisplaceAction, _super);
    function DisplaceAction(source) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this._actionModel = {
            actionType: 'displace',
            source: source.toJson()
        };
        return _this;
    }
    /**
     * @description Sets the x coordinate for displacement.
     * @param {string | number} x The x coordinate value (between -999 and 999)
     * @return {this}
     */
    DisplaceAction.prototype.x = function (x) {
        this._x = x;
        this._actionModel.x = x;
        return this;
    };
    /**
     * @description Sets the y coordinate for displacement.
     * @param {string | number} y The y coordinate value (between -999 and 999)
     * @return {this}
     */
    DisplaceAction.prototype.y = function (y) {
        this._y = y;
        this._actionModel.y = y;
        return this;
    };
    /**
     * @description Sets the position using Position qualifier (alternative to x/y methods).
     * @param {Position} position The position qualifier
     * @return {this}
     */
    DisplaceAction.prototype.position = function (position) {
        // Extract x and y from position and set them in the model
        var positionJson = position.toJson();
        if (positionJson.offsetX !== undefined) {
            this._x = positionJson.offsetX;
            this._actionModel.x = positionJson.offsetX;
        }
        if (positionJson.offsetY !== undefined) {
            this._y = positionJson.offsetY;
            this._actionModel.y = positionJson.offsetY;
        }
        return this;
    };
    DisplaceAction.fromJson = function (actionModel, transformationFromJson) {
        var _a = actionModel, source = _a.source, x = _a.x, y = _a.y;
        var sourceInstance = internal_models_createSourceFromModel.createSourceFromModel(source, transformationFromJson);
        var result = new DisplaceAction(sourceInstance);
        if (x !== undefined) {
            result.x(x);
        }
        if (y !== undefined) {
            result.y(y);
        }
        return result;
    };
    DisplaceAction.prototype.toString = function () {
        var displaceParams = [
            'e_displace',
            'fl_layer_apply'
        ];
        if (this._x !== undefined) {
            displaceParams.push("x_" + this._x);
        }
        if (this._y !== undefined) {
            displaceParams.push("y_" + this._y);
        }
        var layerParts = [
            this.source.getOpenSourceString('l'),
            this.source.getTransformation() && this.source.getTransformation().toString(),
            displaceParams.join(',')
        ].filter(function (a) { return a; });
        return layerParts.join('/');
    };
    return DisplaceAction;
}(internal_Action.Action));

exports.DisplaceAction = DisplaceAction;
