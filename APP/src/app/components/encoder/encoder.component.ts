import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { EncodeRequest } from "src/app/models/encode/encodeRequest.type";
import { EncodeService } from "src/app/services/encode/encode.service";
import { EncodeFormFactory } from "src/app/services/factories/encode/encodeFormFactory.service";
import { LoadingSpinnerService } from "src/app/services/loading/loading.service";
import { SessionService } from "src/app/services/session/session.service";

@Component({
    selector: 'encoder-component',
    templateUrl: './encoder.component.html',
    styleUrls: ['./encoder.component.scss']
})

export class EncoderComponent implements OnInit  {

    encodeDataForm!: FormGroup;
    encodedData: string = '';
    isLoading = this.loadingService.isLoading$;

    constructor(
        private sessionService: SessionService,
        private router: Router,
        private encodeFormFactory: EncodeFormFactory,
        private encodeService: EncodeService,
        private loadingService: LoadingSpinnerService,
    ) {}

    ngOnInit(): void {
        if (!this.sessionService.userLoggedIn.getValue()) {
            this.router.navigate(['']);
        }

        this.encodeDataForm = this.encodeFormFactory.encodeDataForm();
    }

    onSubmit(): void {
        if (this.encodeDataForm.invalid) {
            return
        }

        const encodeRequest: EncodeRequest = {
            dataToEncode: this.encodeDataForm.controls['data'].value,
        }
        
        this.loadingService.show();
        this.encodeService.encode(encodeRequest)
            .pipe(finalize(() => {
                this.loadingService.hide();
                })
            )
            .subscribe((res) => {
                this.encodedData = res;
                }
            )
    }

    onClick(): void {
        window.location.reload();
    }
}