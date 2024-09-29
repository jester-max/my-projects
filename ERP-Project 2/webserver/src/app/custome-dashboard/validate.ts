export function ValidationFunction(properties:any) {
  // Functionality to export


    const schemaObject :any={};

    properties.forEach((property:any) => {
      const {
        key,
        type,
        isArray,
        value,
        ...otherProperties
      } = property;

      if (isArray && value) {

        schemaObject[key] = {
          type: 'array',
          items: ValidationFunction(value),
          // ...otherProperties,
        };
      } else if (!isArray && value) {

        schemaObject[key] = {
          type: 'object',
          properties: ValidationFunction(value),
          // ...otherProperties,
        };
      } else {

        schemaObject[key] = {
          type,
          ...otherProperties,
        };
      }
    });

    return schemaObject;
}


export function ValidateFields(data:any) {
   if (data.type === typeof data.default && !data.primarykey){
     console.log(data)
   }
  // console.log(data)
}



import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

@Injectable({
  providedIn: 'root',
})

export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate
  ): boolean | Promise<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
