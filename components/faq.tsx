import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Servio?",
    answer:
      "Servio is a comprehensive digital solution designed to modernize and streamline restaurant operations while enhancing the customer dining experience. It includes a management dashboard, customer-facing web interface, and an analytics engine.",
  },
  {
    question: "How does Servio improve restaurant efficiency?",
    answer:
      "Servio provides real-time insights and operational control through its management dashboard, enabling efficient menu management, order processing, inventory control, and staff management.",
  },
  {
    question: "Is Servio easy for customers to use?",
    answer:
      "Yes, Servio offers a frictionless dining experience through a progressive web application accessible via QR code. Customers can browse menus, place orders, and process payments without downloading an app.",
  },
  {
    question: "What kind of analytics does Servio provide?",
    answer:
      "Servio's analytics engine processes operational data to generate actionable insights on customer behavior, sales patterns, and operational efficiency, enabling data-driven decision-making for restaurant managers.",
  },
  {
    question: "How can Servio help increase revenue?",
    answer:
      "By streamlining operations, enhancing customer experience, and providing valuable business insights, Servio helps restaurants increase efficiency, reduce costs, and improve customer satisfaction, ultimately leading to increased revenue.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
