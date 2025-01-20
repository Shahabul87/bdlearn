"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password."
  },
  {
    question: "How do I create a new course?",
    answer: "Navigate to the Teacher Dashboard, click on 'Create Course', and follow the step-by-step guide to set up your course content, pricing, and materials."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for course purchases and subscriptions."
  },
  {
    question: "How do I contact my instructor?",
    answer: "You can message your instructor directly through the course dashboard using the 'Message Instructor' button or through the messaging system."
  },
  {
    question: "Can I download course materials?",
    answer: "Yes, most course materials are available for download. Look for the download icon next to downloadable resources in your course content."
  },
  // Add more FAQs as needed
];

export const FAQSection = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="bg-gray-900/50 border border-gray-700/50 rounded-lg px-4"
          >
            <AccordionTrigger className="text-gray-200 hover:text-purple-400">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}; 