import H1 from "@/components/ui/H1";
import Button from "@/components/ui/Button";

interface ContactFormProps {
  formInfo: { name: string; email: string; phone: string; message: string };
  handleFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export default function ContactForm({
  formInfo,
  handleFormChange,
  handleFormSubmit,
}: ContactFormProps) {
  const inputClasses =
    "text-[1.2rem] border-0 border-b border-solid border-b-black bg-transparent focus:outline-none focus:border-b-accent-1";

  return (
    <>
      <H1 className="!text-[3rem]">Get in contact</H1>
      <form
        onSubmit={handleFormSubmit}
        className="w-full h-full"
        data-testid="contact-form"
      >
        <div className="flex flex-col mb-8">
          <label htmlFor="name" className="text-[1.2rem] mb-4">
            Your name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={formInfo.name}
            onChange={handleFormChange}
            autoFocus
            required
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="email" className="text-[1.2rem] mb-4">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@email.com"
            value={formInfo.email}
            onChange={handleFormChange}
            required
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="phone" className="text-[1.2rem] mb-4">
            Phone:
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="888-888-8888"
            value={formInfo.phone}
            onChange={handleFormChange}
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="message" className="text-[1.2rem] mb-4">
            Message:
          </label>
          <textarea
            name="message"
            id="message"
            value={formInfo.message}
            placeholder="Your message..."
            onChange={handleFormChange}
            required
            className="text-[1.2rem] h-32 font-[Helvetica,Arial,sans-serif] border-0 rounded-small bg-light-grey p-2 resize-none focus:outline focus:outline-1 focus:outline-accent-1"
          />
        </div>
        <div className="flex flex-col">
          <Button type="submit">Contact</Button>
        </div>
      </form>
    </>
  );
}
