import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.css']
})
export class NotFoundPage implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    console.error('404 Error: User attempted to access non-existent route:', this.router.url);
  }
}
