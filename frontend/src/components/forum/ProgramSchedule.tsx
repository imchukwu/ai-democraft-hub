import { useState } from "react";
import { Reveal, SectionHeader } from "./primitives";
import { program, sessionTypes, type SessionType } from "@/data/forum";
import { Calendar, Clock, MapPin, User, LayoutGrid, ListFilter, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProgramSchedule() {
  const [selectedDay, setSelectedDay] = useState<string>("Day 1");
  const [selectedType, setSelectedType] = useState<SessionType>("All");
  const [viewMode, setViewMode] = useState<"rows" | "tabs">("rows");

  const days = Array.from(new Set(program.map((s) => s.day)));

  const getSessionsForDay = (day: string) => {
    return program.filter((s) => {
      const matchesDay = s.day === day;
      const matchesType = selectedType === "All" || s.type === selectedType;
      return matchesDay && matchesType;
    });
  };

  const filteredSessions = program.filter((s) => {
    const matchesDay = s.day === selectedDay;
    const matchesType = selectedType === "All" || s.type === selectedType;
    return matchesDay && matchesType;
  });

  return (
    <section className="border-b border-border bg-parallax-light py-16 md:py-28" id="schedule">
      <div className="container-forum">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Schedule & Agenda"
            title="Program"
            lede="Explore the 3-day schedule of keynotes, panel discussions, interactive workshops, sandbox walk-throughs, and policy drafting sessions."
          />

          {/* View Switcher: Rows vs Single Day Tabs */}
          <Reveal className="flex items-center gap-2 self-start md:self-auto rounded-xl border border-border bg-card p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode("rows")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                viewMode === "rows"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Day Rows (Swipe)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("tabs")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                viewMode === "tabs"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <ListFilter className="h-3.5 w-3.5" />
              <span>Single Day List</span>
            </button>
          </Reveal>
        </div>

        {/* Category Filters */}
        <Reveal className="mt-8 flex flex-wrap gap-2">
          {sessionTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
                selectedType === type
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-secondary",
              )}
            >
              {type}
            </button>
          ))}
        </Reveal>

        {/* MODE 1: DAY ROWS (Horizontal Swipe per day to avoid vertical scrolling) */}
        {viewMode === "rows" ? (
          <div className="mt-10 space-y-12">
            {days.map((day, dayIdx) => {
              const daySessions = getSessionsForDay(day);
              const daySample = program.find((s) => s.day === day);
              const dateStr = daySample ? daySample.date : "";

              return (
                <Reveal key={day} delay={dayIdx * 80}>
                  <div className="rounded-2xl border border-border/80 bg-card/60 p-4 sm:p-6 shadow-sm">
                    {/* Day Header */}
                    <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary uppercase tracking-wide">
                          <Calendar className="h-3.5 w-3.5" />
                          {day}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          {dateStr}
                        </span>
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          {daySessions.length} sessions
                        </span>
                      </div>

                      {/* Swipe Hint indicator */}
                      <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                        <span>Swipe cards</span>
                        <ChevronRight className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>

                    {/* Horizontal Scroll Track for this day */}
                    {daySessions.length === 0 ? (
                      <div className="py-8 text-center text-xs text-muted-foreground italic">
                        No {selectedType !== "All" ? selectedType : ""} sessions on {day}.
                      </div>
                    ) : (
                      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 pt-1 scrollbar-none -mx-2 px-2">
                        {daySessions.map((session) => (
                          <div
                            key={session.id}
                            className="group flex w-[290px] sm:w-[340px] shrink-0 snap-start flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/60 hover:shadow-md"
                          >
                            <div>
                              {/* Time & Location */}
                              <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2.5">
                                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-primary">
                                  <Clock className="h-3.5 w-3.5 shrink-0" />
                                  <span>{session.endTime ? `${session.time} – ${session.endTime}` : session.time}</span>
                                </div>
                                <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                  {session.type}
                                </span>
                              </div>

                              {/* Title */}
                              <h4 className="mt-3 text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {session.title}
                              </h4>

                              {/* Location Badge */}
                              <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                                <MapPin className="h-3 w-3 text-primary shrink-0" />
                                <span className="truncate">{session.location}</span>
                              </div>

                              {/* Description Snippet */}
                              <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                {session.description}
                              </p>
                            </div>

                            {/* Speakers */}
                            {session.speakers.length > 0 ? (
                              <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-border/40 pt-3 text-[11px] font-medium text-foreground/80">
                                <User className="h-3 w-3 text-primary shrink-0" />
                                <span className="text-muted-foreground">Speakers:</span>
                                {session.speakers.slice(0, 2).map((sp, i) => (
                                  <span key={i} className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-normal text-secondary-foreground">
                                    {sp}
                                  </span>
                                ))}
                                {session.speakers.length > 2 ? (
                                  <span className="text-[10px] text-muted-foreground">+{session.speakers.length - 2} more</span>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          /* MODE 2: SINGLE DAY TABBED LIST */
          <div>
            {/* Day Selector Tabs */}
            <Reveal className="mt-8 flex flex-wrap gap-2 border-b border-border pb-4">
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

            {/* Timeline Schedule List */}
            <div className="mt-8 space-y-6">
              {filteredSessions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground text-sm">
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
        )}
      </div>
    </section>
  );
}
