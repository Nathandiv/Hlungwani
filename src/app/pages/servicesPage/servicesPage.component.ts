import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as AOS from 'aos';
import { NavbarComponent } from '../../Shared-Ui/navbar/navbar.component';
import { FooterComponent } from '../../Shared-Ui/footer/footer.component';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  hook: string;
  // icon: string;
}

interface QuoteForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  serviceId: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  additionalNotes: string;
}

interface ConsultationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  projectDescription: string;
  timeline: string;
  preferredContactMethod: string;
  additionalNotes: string;
}

interface WorkStep {
  // step: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './servicesPage.component.html',
  styleUrls: ['./servicesPage.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServicesPageComponent implements OnInit, OnDestroy {

  showQuoteModal: boolean = false;
  showConsultationModal: boolean = false;
  isSubmitting: boolean = false;
  isSubmittingConsultation: boolean = false;

  selectedFiles: File[] = [];
  selectedConsultationFiles: File[] = [];

  quoteForm: QuoteForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    serviceId: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    additionalNotes: ''
  };

  consultationForm: ConsultationForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectDescription: '',
    timeline: '',
    preferredContactMethod: 'email',
    additionalNotes: ''
  };

  // Services (4 modern services)
  services: Service[] = [
    {
      id: 'end-to-end',
      title: 'Full Web & Mobile Development',
      subtitle: 'End-to-End Solutions',
      hook: 'I build complete, scalable web and mobile applications from concept to launch and beyond.',
      // icon: '🚀'
    },
    {
      id: 'systems',
      title: 'Business Systems & Tools',
      subtitle: 'Custom Software',
      hook: 'Custom CRM, ERP, and internal systems designed to streamline your operations.',
      // icon: '⚙️'
    },
    {
      id: 'backend',
      title: 'Back-End Development',
      subtitle: 'Secure & Scalable',
      hook: 'Powerful, secure, and high-performance server-side solutions and APIs.',
      // icon: '⚡'
    },
    {
      id: 'frontend',
      title: 'Front-End Development',
      subtitle: 'Beautiful Interfaces',
      hook: 'Modern, responsive, and user-friendly interfaces that drive engagement.',
      // icon: '🎨'
    }
  ];

  // Proven Process Steps
  workSteps: WorkStep[] = [
    {
      // step: 1,
      title: 'Discovery',
      description: 'Understanding your business goals and technical requirements.',
      icon: '🔍'
    },
    {
      // step: 2,
      title: 'Design',
      description: 'Creating intuitive interfaces and solid architecture.',
      icon: '🎨'
    },
    {
      // step: 3,
      title: 'Develop',
      description: 'Building your solution with regular updates.',
      icon: '⚡'
    },
    {
      // step: 4,
      title: 'Deploy',
      description: 'Testing and launching your application smoothly.',
      icon: '🚀'
    },
    {
      // step: 5,
      title: 'Support',
      description: 'Ongoing maintenance and optimization.',
      icon: '🛡️'
    }
  ];

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }

  ngOnDestroy(): void {
    AOS.refresh();
  }

  openQuoteModal(serviceId: string): void {
    this.quoteForm.serviceId = serviceId;
    this.showQuoteModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeQuoteModal(): void {
    this.showQuoteModal = false;
    this.resetForm();
    document.body.style.overflow = 'auto';
  }

  openConsultationModal(): void {
    this.showConsultationModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeConsultationModal(): void {
    this.showConsultationModal = false;
    this.resetConsultationForm();
    document.body.style.overflow = 'auto';
  }

  onFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    const maxSize = 10 * 1024 * 1024;

    files.forEach(file => {
      if (file.size <= maxSize) {
        this.selectedFiles.push(file);
      } else {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
      }
    });
    event.target.value = '';
  }

  onConsultationFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    const maxSize = 10 * 1024 * 1024;

    files.forEach(file => {
      if (file.size <= maxSize) {
        this.selectedConsultationFiles.push(file);
      } else {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
      }
    });
    event.target.value = '';
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  removeConsultationFile(index: number): void {
    this.selectedConsultationFiles.splice(index, 1);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  submitQuote(): void {
    if (!this.isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      console.log('Quote form submitted:', {
        ...this.quoteForm,
        files: this.selectedFiles.map(f => ({ name: f.name, size: f.size }))
      });
      
      alert('Thank you! Your quote request has been submitted. I\'ll get back to you within 24 hours.');
      this.closeQuoteModal();
      this.isSubmitting = false;
    }, 1500);
  }

  submitConsultation(): void {
    if (!this.isConsultationFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    this.isSubmittingConsultation = true;

    setTimeout(() => {
      alert('Thank you! Your consultation request has been sent. I\'ll contact you soon.');
      this.closeConsultationModal();
      this.isSubmittingConsultation = false;
    }, 1500);
  }

  private isFormValid(): boolean {
    return !!(
      this.quoteForm.firstName &&
      this.quoteForm.lastName &&
      this.quoteForm.email &&
      this.quoteForm.serviceId &&
      this.quoteForm.projectDescription
    );
  }

  private isConsultationFormValid(): boolean {
    return !!(
      this.consultationForm.firstName &&
      this.consultationForm.lastName &&
      this.consultationForm.email &&
      this.consultationForm.projectDescription
    );
  }

  private resetForm(): void {
    this.quoteForm = {
      firstName: '', lastName: '', email: '', phone: '', company: '',
      serviceId: '', projectDescription: '', timeline: '', budget: '', additionalNotes: ''
    };
    this.selectedFiles = [];
  }

  private resetConsultationForm(): void {
    this.consultationForm = {
      firstName: '', lastName: '', email: '', phone: '', company: '',
      projectType: '', projectDescription: '', timeline: '',
      preferredContactMethod: 'email', additionalNotes: ''
    };
    this.selectedConsultationFiles = [];
  }
}