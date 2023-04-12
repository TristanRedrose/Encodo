import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function hasNumericValidator(): ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
        
        const value = control.value;

        if (!value) {
            return null;
        }

        const hasNumeric = /[0-9]+/.test(value);

        if (!hasNumeric) {
            return {hasNumeric: true};
        }

        return null;
    }
}