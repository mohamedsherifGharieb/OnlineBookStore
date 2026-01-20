import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AccountService } from '../Core/services/account-service';
import { Home } from '../Features/home/home';
import { Nav } from '../Layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav],
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

