import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css'],
})
export class HeroSection {
  private _heroImage = signal<string | null>(null);
  private _subheadline = signal<string>(
    'Discover, buy, and read thousands of books from independent bookstores around the world'
  );
  private _description = signal<string>(
    'Browse curated collections, support local stores, and build your personal library.'
  );

  // convert signals to readonly computed values for templates
  readonly heroImage = computed(() => this._heroImage());
  readonly subheadline = computed(() => this._subheadline());
  readonly description = computed(() => this._description());

  @Input()
  set heroImageInput(v: string | null) {
    this._heroImage.set(v);
  }


  @Input()
  set subheadlineInput(v: string) {
    this._subheadline.set(v);
  }

  @Input()
  set descriptionInput(v: string) {
    this._description.set(v);
  }

  @Output() browse = new EventEmitter<void>();
  @Output() learn = new EventEmitter<void>();

  onBrowse() {
    this.browse.emit();
  }

  onLearn() {
    this.learn.emit();
  }
}
