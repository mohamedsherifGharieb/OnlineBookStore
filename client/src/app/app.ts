import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  private http = inject(HttpClient);


  protected readonly title = signal('client');
   async ngOnInit(): Promise<void> {
    this.members.set(await this.getMembers());
  }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get('https://localhost:5002/api/members'));
      }
    catch(error){
      console.log(error);
      throw error;
    }

}
