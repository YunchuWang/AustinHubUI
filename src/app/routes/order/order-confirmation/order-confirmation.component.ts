import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core';
import * as confetti from 'canvas-confetti/src/confetti';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styles: [],
})
export class OrderConfirmationComponent implements OnInit {
  accountName: string;
  orderNo: string;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.accountName = this.authService.getUserName();
    this.orderNo = this.route.snapshot.paramMap.get('orderNo');
    if (!this.orderNo) {
      this.router.navigateByUrl('/#');
    }
    // launch animation
    confetti({
      particleCount: 100,
      startVelocity: 50,
      spread: 360,
      shapes: ['circle', 'circle', 'square'],
      decay: 0.95,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
    });
  }
}
