import { MessageSquare, Lightbulb, Code, Database, LineChart } from "lucide-react";

export default function ContactHeroLeft() {
  const contactReasons = [
    { icon: MessageSquare, text: "Share feedback and suggestions" },
    { icon: Lightbulb, text: "Discuss project ideas" },
    { icon: Code, text: "Inquire about collaborations" },
  ];

  const services = [
    { icon: Code, text: "Web Development" },
    { icon: Database, text: "Software Development" },
    { icon: LineChart, text: "Data Analysis & ML" },
  ];

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-balance">
          Get in{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Touch
          </span>
        </h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Have a question, feedback, or want to collaborate? I'd love to hear from you.
        </p>
      </div>

      {/* Contact Reasons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Why reach out?</h3>
        <div className="space-y-3">
          {contactReasons.map((reason, idx) => (
            <div key={idx} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                <reason.icon size={20} className="text-accent" />
              </div>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {reason.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Services Offered */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-lg font-semibold">Services I offer</h3>
        <div className="space-y-3">
          {services.map((service, idx) => (
            <div key={idx} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                <service.icon size={20} className="text-accent" />
              </div>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {service.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Contact Info */}
      <div className="p-6 bg-card rounded-lg border border-border">
        <p className="text-sm text-muted-foreground mb-2">Quick response time</p>
        <p className="text-lg font-semibold">Usually within 24 hours</p>
      </div>
    </div>
  );
}
