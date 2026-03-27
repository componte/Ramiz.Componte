import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
