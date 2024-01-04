import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message: string = 'Some Welcome Message';
  welcomeMessageFromService: string = '';
  name = '';

  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService
  ) { }

  ngOnInit(): void {
    console.log(this.message);
    // console.log(this.route.snapshot.params['name']);
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage(): void {
    // console.log('get welcome message');
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  getWelcomeMessageWithParameter(): void {
    this.service.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response: any) {
    this.welcomeMessageFromService = response.message;
  }

  handleErrorResponse(error: any) {
    this.welcomeMessageFromService = error.error.message;
  }
}
