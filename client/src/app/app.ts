import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AccountService } from '../Core/services/account-service';
import { Nav } from '../Layout/nav/nav';
import { HeroSection } from '../Sections/hero/hero-section';
import { AboutSection } from '../Sections/about/about-section';
import { BookList } from '../Features/Books/book-list/book-list';
import { HowItWorks } from '../Sections/how-it-works/how-it-works';
import { Footer } from '../Sections/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Nav,HeroSection,AboutSection,BookList,HowItWorks,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected readonly title = 'BookStore';
  protected members= signal<any>([]); 

  async ngOnInit(): Promise<void> {
    this.setCurrentUser();
  }
  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }


}

