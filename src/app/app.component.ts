import {Component, OnDestroy, OnInit} from '@angular/core';
import {initializeMatrixEffect} from './matrix/matrix-effect';
import {NgOptimizedImage} from '@angular/common';
import {TerminalComponent} from './terminal/terminal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TerminalComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  roles = ['backend developer', 'frontend developer'];
  index = 0;
  currentText = '';
  isDeleting = false;
  typingSpeed = 150;
  pauseDuration = 2000;
  isTerminalOpen = false;

  ngOnInit(): void {
    initializeMatrixEffect();
    this.startTypingEffect();
  }

  ngOnDestroy() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.remove();
    }
  }

  toggleTerminal() {
    this.isTerminalOpen = !this.isTerminalOpen;
  }

  handleTerminalClosed() {
    this.isTerminalOpen = false;
  }

  startTypingEffect() {
    const fullText = this.roles[this.index];
    if (this.isDeleting) {
      this.currentText = fullText.substring(0, this.currentText.length - 1);
    } else {
      this.currentText = fullText.substring(0, this.currentText.length + 1);
    }

    let speed = this.typingSpeed;
    if (this.isDeleting) speed /= 2;

    if (!this.isDeleting && this.currentText === fullText) {
      speed = this.pauseDuration;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false;
      this.index = (this.index + 1) % this.roles.length;
    }

    setTimeout(() => this.startTypingEffect(), speed);
  }
}
