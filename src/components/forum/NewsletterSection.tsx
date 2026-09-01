import { useState } from "react";
import { Reveal } from "./primitives";
import { CheckCircle2, Mail } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="border-b border-border bg-parallax-light py-20 md:py-24">
      <div className="container-forum max-w-4xl text-center">
        <Reveal>
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Mail className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Stay Connected
          </h2>

          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Receive updates about the AI & Democracy Forum, new research, upcoming events, and opportunities to participate.
          </p>

          {subscribed ? (
            <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary/10 px-6 py-4 text-sm font-semibold text-primary">
              <CheckCircle2 className="h-5 w-5" />
              <span>Thank you! You have been subscribed to Forum dispatch updates.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full max-w-md rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-foreground px-7 py-3 text-sm font-bold text-background hover:bg-primary transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
