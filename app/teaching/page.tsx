import Header from '../components/Header';
import TeachingContent from '../components/TeachingContent';
import Footer from '../components/Footer';

export default function TeachingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-20">
        <TeachingContent />
      </main>
      <Footer />
    </div>
  );
} 