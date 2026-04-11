import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../Shared-Ui/navbar/navbar.component';
import { FooterComponent } from '../../Shared-Ui/footer/footer.component';
import AOS from 'aos';
import Typed from 'typed.js';
import 'aos/dist/aos.css';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isLoading = true;

  ngOnInit(): void {
    // Show loading screen for 2.5s
    setTimeout(() => {
      this.isLoading = false;

      // After the DOM is visible, initialize Typed.js
      setTimeout(() => {
        const typedElement = document.querySelector('.typed');
        if (typedElement) {
          new Typed('.typed', {
            strings: [
              'Software Engineer',
              'Full-Stack Developer',
              'Web Developer',
              'Mobile App Developer',
              'Software Developer',
            ],
            typeSpeed: 80,
            backSpeed: 70,
            backDelay: 1500,
            loop: true,
            startDelay: 1000,
          });
        }
      }, 0); // Wait for Angular to finish rendering

    }, 2500);

    // Initialize AOS animations
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }

  activePanels: Set<number> = new Set();

  togglePanel(index: number): void {
    if (this.activePanels.has(index)) {
      this.activePanels.delete(index);
    } else {
      this.activePanels.add(index);
    }
  }

  isActive(index: number): boolean {
    return this.activePanels.has(index);
  }
}
