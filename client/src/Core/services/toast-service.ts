import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'toast-container';
    this.container.style.cssText =
      'position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;display:flex;flex-direction:column;gap:0.75rem;pointer-events:none;';
    document.body.appendChild(this.container);
  }

  private show(message: string, type: 'success' | 'error' | 'warn' | 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      pointer-events:auto;display:flex;align-items:center;gap:0.75rem;
      padding:0.75rem 1.25rem;border-radius:0.5rem;
      font-family:'Inter',sans-serif;font-size:0.925rem;
      box-shadow:0 4px 12px rgba(0,0,0,0.15);
      opacity:0;transform:translateX(1rem);
      transition:opacity 0.3s ease,transform 0.3s ease;
      max-width:22rem;word-break:break-word;
    `;

    const styles: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      success: { bg: '#f0fdf4', border: '#166534', text: '#166534', icon: '✓' },
      error:   { bg: '#fef2f2', border: '#8b4513', text: '#5d4037', icon: '✕' },
      warn:    { bg: '#fff8dc', border: '#d2691e', text: '#5d4037', icon: '⚠' },
      info:    { bg: '#f5f5dc', border: '#5d4037', text: '#3e2723', icon: 'ℹ' },
    };

    const s = styles[type];
    toast.style.backgroundColor = s.bg;
    toast.style.border = `1.5px solid ${s.border}`;
    toast.style.color = s.text;

    toast.innerHTML = `
      <span style="font-weight:600;font-size:1.1rem;line-height:1">${s.icon}</span>
      <span style="flex:1">${message}</span>
      <button style="background:none;border:none;cursor:pointer;font-size:1rem;color:${s.text};padding:0 0.25rem;line-height:1">✕</button>
    `;

    toast.querySelector('button')!.addEventListener('click', () => this.dismiss(toast));
    this.container.appendChild(toast);

    // trigger enter animation
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(0)';
    });

    setTimeout(() => this.dismiss(toast), duration);
  }

  private dismiss(toast: HTMLDivElement) {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(1rem)';
    setTimeout(() => toast.remove(), 300);
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  warn(message: string, duration?: number) {
    this.show(message, 'warn', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }
}
