import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/app/services/session/session.service";

@Component({
    selector: 'main-component',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
    userLoggedIn = this.sessionService.userLoggedIn$;
    
    constructor(
        private sessionService: SessionService,
        private router: Router,
    ) {}
    
    ngOnInit(): void {
        this.sessionService.checkSession();
    }

    logout(): void {
        this.sessionService.logout();
        this.router.navigate(['']);
    }

}