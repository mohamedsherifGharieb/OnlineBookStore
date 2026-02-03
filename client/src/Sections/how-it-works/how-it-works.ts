import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  icon: string;
  number: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.html',
  styleUrls: ['./how-it-works.css']
})
export class HowItWorks {
  steps: Step[] = [
    {
      icon: 'search',
      number: 1,
      title: 'Browse & Select',
      description: 'Explore thousands of books and find your next great read',
    },
    {
      icon: 'cart',
      number: 2,
      title: 'Add to Cart',
      description: 'Build your collection and save favorites for later',
    },
    {
      icon: 'lock',
      number: 3,
      title: 'Secure Checkout',
      description: 'Complete your purchase with our safe payment system',
    },
    {
      icon: 'book',
      number: 4,
      title: 'Enjoy Reading',
      description: 'Receive your books and start your reading adventure',
    },
  ];
}
