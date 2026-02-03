import { Component } from '@angular/core';
import { Nav } from '../../Layout/nav/nav';
import { HeroSection } from '../../Sections/hero/hero-section';
import { AboutSection } from '../../Sections/about/about-section';
import { BookList } from '../../Features/Books/book-list/book-list';
import { HowItWorks } from '../../Sections/how-it-works/how-it-works';
import { Footer } from '../../Sections/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Nav, HeroSection, AboutSection, BookList, HowItWorks, Footer],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomePage {}
