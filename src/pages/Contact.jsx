import ContactHero from "./../components/ContactHero";
import Form from "./../components/ContactForm";

export default function Contact() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center py-16 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 dark:from-cyan-500/5 dark:via-blue-500/5 dark:to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Section - Information */}
          <ContactHero />

          {/* Right Section - Contact Form */}
          <div className="lg:mt-12">
            <div className="bg-card rounded-2xl border border-border p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
