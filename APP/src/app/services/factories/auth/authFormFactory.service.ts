import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { hasNumericValidator } from "../validators/hasNumeric.validator";

@Injectable({
    providedIn: 'root'
})

export class AuthFormFactory {
    
    constructor() {}

    loginForm(): FormGroup {
        return new FormGroup({
            email: new FormControl(null,[Validators.email, Validators.required]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6), hasNumericValidator()]),
        });  
    }
    
}