import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class EncodeFormFactory {
    
    constructor() {}

    encodeDataForm(): FormGroup {
        return new FormGroup({
            data: new FormControl(null, Validators.required),
        });  
    }

}