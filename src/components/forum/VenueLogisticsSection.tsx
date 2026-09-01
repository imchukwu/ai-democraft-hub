import { Reveal, SectionHeader } from "./primitives";
import { forumMeta } from "@/data/forum";
import { Building2, Bus, FileCheck2, Hotel, Plane } from "lucide-react";

export function VenueLogisticsSection() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Delegate Information"
          title="Venue & Host City Guide"
          lede="Essential logistics details for international and local delegates attending the AI & Democracy Forum in Abuja, Nigeria."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Main Venue Card with Real Photo */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-lg">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Main Convening Venue
                    </span>
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                    {forumMeta.venue}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Herbert Macaulay Way, Central Business District, Abuja, Federal Capital Territory, Nigeria.
                  </p>

                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    The International Conference Centre (ICC) is West Africa's premier convening facility, equipped with simultaneous interpretation infrastructure, high-density optical fiber connectivity, dedicated exhibition halls, security perimeter, and press briefing suites.
                  </p>
                </div>

                {/* Real Venue Photography */}
                <div className="mt-6 aspect-[16/8] overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
                  <img
                    src="/images/hero-forum.jpg"
                    alt="Abuja International Conference Centre"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Logistics Grid Cards */}
          <div className="lg:col-span-6 grid gap-6 sm:grid-cols-2">
            <Reveal delay={60}>
              <div className="rounded-xl border border-border bg-card p-6">
                <Plane className="h-6 w-6 text-primary mb-3" />
                <h4 className="text-base font-bold text-foreground">International Flights</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Nnamdi Azikiwe International Airport (ABV) offers direct flights from London, Paris, Frankfurt, Addis Ababa, Cairo, Johannesburg, and West African capitals.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-xl border border-border bg-card p-6">
                <FileCheck2 className="h-6 w-6 text-primary mb-3" />
                <h4 className="text-base font-bold text-foreground">Visa Support & Letters</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Official Visa-on-Arrival (VoA) approval letters and diplomatic facilitation letters are issued automatically upon confirmed registration.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="rounded-xl border border-border bg-card p-6">
                <Hotel className="h-6 w-6 text-primary mb-3" />
                <h4 className="text-base font-bold text-foreground">Hotel Partner Rates</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Discounted delegate room blocks reserved at Transcorp Hilton Abuja, Abuja Continental Hotel, and Fraser Suites (within 10 mins of venue).
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="rounded-xl border border-border bg-card p-6">
                <Bus className="h-6 w-6 text-primary mb-3" />
                <h4 className="text-base font-bold text-foreground">Airport Shuttles</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Complimentary security-escorted Forum shuttle buses run every 30 minutes between ABV Airport, partner hotels, and the ICC.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
