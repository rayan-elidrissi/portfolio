import Header from '../components/Header';
import AboutMe from '../components/AboutMe';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-20">
        <AboutMe />
      </main>
      <Footer />
    </div>
  );
} 