import { useState } from "react";
import { Reveal, SectionHeader } from "./primitives";
import { program, sessionTypes, type SessionType } from "@/data/forum";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProgramSchedule() {
  const [selectedDay, setSelectedDay] = useState<string>("Day 1");
  const [selectedType, setSelectedType] = useState<SessionType>("All");

  const days = Array.from(new Set(program.map((s) => s.day)));

  const filteredSessions = program.filter((s) => {
    const matchesDay = s.day === selectedDay;
    const matchesType = selectedType === "All" || s.type === selectedType;
    return matchesDay && matchesType;
  });

  return (
    <section className="border-b border-border bg-parallax-light py-20 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Schedule & Agenda"
          title="Program"
          lede="Explore the 3-day schedule of keynotes, panel discussions, interactive workshops, sandbox walk-throughs, and policy drafting sessions."
        />

        {/* Day Tabs */}
        <Reveal className="mt-12 flex flex-wrap gap-2 border-b border-border pb-4">
          {days.map((day) => {
            const daySample = program.find((s) => s.day === day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all",
                  selectedDay === day
                    ? "bg-foreground text-background shadow-md"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Calendar className="h-4 w-4" />
                <span>{day}</span>
                {daySample ? <span className="text-xs font-normal opacity-80">({daySample.date.split(",")[1]?.trim()})</span> : null}
              </button>
            );
          })}
        </Reveal>

        {/* Category Filters */}
        <Reveal className="mt-6 flex flex-wrap gap-2">
          {sessionTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium transition-all",
                selectedType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-secondary",
              )}
            >
              {type}
            </button>
          ))}
        </Reveal>

        {/* Timeline Schedule */}
        <div className="mt-10 space-y-6">
          {filteredSessions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No sessions found matching category "{selectedType}" on {selectedDay}.
            </div>
          ) : (
            filteredSessions.map((session, idx) => (
              <Reveal key={session.id} delay={idx * 50}>
                <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/40 hover:shadow-md md:p-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-primary">
                        <Clock className="h-4 w-4" />
                        <span>{session.endTime ? `${session.time} – ${session.endTime}` : session.time}</span>
                      </div>
                      <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {session.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>{session.location}</span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground group-hover:text-primary">
                    {session.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {session.description}
                  </p>

                  {session.speakers.length > 0 ? (
                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/50 pt-4 text-xs font-medium text-foreground/80">
                      <User className="h-3.5 w-3.5 text-primary" />
                      <span>Speakers:</span>
                      {session.speakers.map((sp, i) => (
                        <span key={i} className="rounded bg-secondary px-2 py-0.5 font-normal text-secondary-foreground">
                          {sp}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
