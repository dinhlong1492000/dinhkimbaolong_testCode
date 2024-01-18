import { Model, AjvValidator } from "objection";
import _ from "lodash";
import addFormats from "ajv-formats";

export class ExtendedModel extends Model {
  static createValidator() {
    return new AjvValidator({
      onCreateAjv: (ajv) => {
        addFormats(ajv);
      },
      options: {
        allErrors: true,
        validateSchema: true,
        ownProperties: true,
      },
    });
  }

  $beforeValidate(jsonSchema: any, json: any, opt: any) {
    _.each(jsonSchema.properties, (schema, propertyName) => {
      if (
        schema &&
        typeof schema.format !== "undefined" &&
        schema.format === "date-time"
      ) {
        const valueToValidate = json[propertyName];
        if (valueToValidate !== null && _.isDate(valueToValidate)) {
          json[propertyName] = valueToValidate.toISOString();
        }
      }
    });
    return jsonSchema;
  }
}
