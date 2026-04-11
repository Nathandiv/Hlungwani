import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import * as AOS from 'aos';
import { NavbarComponent } from '../../Shared-Ui/navbar/navbar.component';
import { FooterComponent } from '../../Shared-Ui/footer/footer.component';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  hook: string;
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
  showSuccessModal: boolean = false;
  successMessage: string = '';

  isSubmitting: boolean = false;
  isSubmittingConsultation: boolean = false;

  quoteForm: QuoteForm = {
    firstName: '', lastName: '', email: '', phone: '', company: '',
    serviceId: '', projectDescription: '', timeline: '', budget: '', additionalNotes: ''
  };

  consultationForm: ConsultationForm = {
    firstName: '', lastName: '', email: '', phone: '', company: '',
    projectType: '', projectDescription: '', timeline: '',
    preferredContactMethod: 'email', additionalNotes: ''
  };

  services: Service[] = [
    { id: 'end-to-end', title: 'Full Web & Mobile Development', subtitle: 'End-to-End Solutions', hook: 'I build complete, scalable web and mobile applications from concept to launch and beyond.' },
    { id: 'systems', title: 'Business Systems & Tools', subtitle: 'Custom Software', hook: 'Custom CRM, ERP, and internal systems designed to streamline your operations.' },
    { id: 'backend', title: 'Back-End Development', subtitle: 'Secure & Scalable', hook: 'Powerful, secure, and high-performance server-side solutions and APIs.' },
    { id: 'frontend', title: 'Front-End Development', subtitle: 'Beautiful Interfaces', hook: 'Modern, responsive, and user-friendly interfaces that drive engagement.' }
  ];

  workSteps: WorkStep[] = [
    { title: 'Discovery', description: 'Understanding your business goals and technical requirements.', icon: '🔍' },
    { title: 'Design', description: 'Creating intuitive interfaces and solid architecture.', icon: '🎨' },
    { title: 'Develop', description: 'Building your solution with regular updates.', icon: '⚡' },
    { title: 'Deploy', description: 'Testing and launching your application smoothly.', icon: '🚀' },
    { title: 'Support', description: 'Ongoing maintenance and optimization.', icon: '🛡️' }
  ];

  ngOnInit(): void {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });
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
    this.resetQuoteForm();
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

  // Success Modal
  showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessModal = true;
    document.body.style.overflow = 'hidden';

    // Auto close after 3 seconds
    setTimeout(() => {
      this.closeSuccessModal();
    }, 3000);
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.successMessage = '';
    document.body.style.overflow = 'auto';
  }

  // Submit Quote
  async submitQuote(ngForm: NgForm) {
    if (ngForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('access_key', '18155a87-df5c-4465-b923-8cb64eb3e1b3');
    formData.append('subject', 'New Quote Request - NexGrow');
    formData.append('from_name', 'NexGrow Website');

    formData.append('firstName', this.quoteForm.firstName);
    formData.append('lastName', this.quoteForm.lastName);
    formData.append('email', this.quoteForm.email);
    formData.append('phone', this.quoteForm.phone || 'Not provided');
    formData.append('company', this.quoteForm.company || 'Not provided');
    formData.append('service', this.quoteForm.serviceId);
    formData.append('projectDescription', this.quoteForm.projectDescription);
    formData.append('timeline', this.quoteForm.timeline || 'Not specified');
    formData.append('additionalNotes', this.quoteForm.additionalNotes || '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        this.showSuccess("Thank you! Your quote request has been sent successfully. I will get back to you soon.");
        ngForm.resetForm();
        this.resetQuoteForm();
        this.closeQuoteModal();
      } else {
        alert(`Submission failed: ${result.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please try again later.');
    } finally {
      this.isSubmitting = false;
    }
  }

  // Submit Consultation
  async submitConsultation(ngForm: NgForm) {
    if (ngForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    this.isSubmittingConsultation = true;

    const formData = new FormData();
    formData.append('access_key', '18155a87-df5c-4465-b923-8cb64eb3e1b3');
    formData.append('subject', 'New Consultation Request - NexGrow');
    formData.append('from_name', 'NexGrow Website');

    formData.append('firstName', this.consultationForm.firstName);
    formData.append('lastName', this.consultationForm.lastName);
    formData.append('email', this.consultationForm.email);
    formData.append('phone', this.consultationForm.phone || 'Not provided');
    formData.append('company', this.consultationForm.company || 'Not provided');
    formData.append('projectType', this.consultationForm.projectType || 'Not specified');
    formData.append('projectDescription', this.consultationForm.projectDescription);
    formData.append('timeline', this.consultationForm.timeline || 'Not specified');
    formData.append('preferredContactMethod', this.consultationForm.preferredContactMethod);
    formData.append('additionalNotes', this.consultationForm.additionalNotes || '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        this.showSuccess("Thank you! Your consultation request has been sent successfully. I will contact you soon.");
        ngForm.resetForm();
        this.resetConsultationForm();
        this.closeConsultationModal();
      } else {
        alert(`Submission failed: ${result.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please try again later.');
    } finally {
      this.isSubmittingConsultation = false;
    }
  }

  private resetQuoteForm(): void {
    this.quoteForm = {
      firstName: '', lastName: '', email: '', phone: '', company: '',
      serviceId: '', projectDescription: '', timeline: '', budget: '', additionalNotes: ''
    };
  }

  private resetConsultationForm(): void {
    this.consultationForm = {
      firstName: '', lastName: '', email: '', phone: '', company: '',
      projectType: '', projectDescription: '', timeline: '',
      preferredContactMethod: 'email', additionalNotes: ''
    };
  }
}