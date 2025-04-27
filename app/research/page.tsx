import Header from '../components/Header';
import ResearchGrid from '../components/ResearchGrid';
import InteractiveXAI from '../components/InteractiveXAI';
// import PublicationsSection from '../components/PublicationsSection';
import Footer from '../components/Footer';

export default function ResearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-20">
        {/* <InteractiveXAI /> */}  
        <ResearchGrid />
        {/* <PublicationsSection /> */}
      </main>
      <Footer />
    </div>
  );
} 