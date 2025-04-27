import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-6 text-center">Contact Me</h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-center mb-12">
            Feel free to reach out if you're interested in collaborating on research, discussing AI and HCI innovations, or have any questions about my work.
          </p>
        </div>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
} 