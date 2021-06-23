import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  createNewNotification(): void {
    const title = 'CTA-Builder Notification';
    const options = {
      body : 'CTA-Builder updated to the newest patch notes!'

    };
    let Notifica = new Notification(title, options);
  }

  requestNotification(): void {

    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        console.info('Notificationpermission granted');
        this.createNewNotification();
      }
    });
  }

}
