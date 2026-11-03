import { PageHero } from "@/components/layout/page-hero";
import { StoryNav } from "@/components/sections/story-nav";
import { TeamCard } from "@/components/sections/team-card";
import { Container, Eyebrow, Section, SampleNotice } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { getTeam } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Team", description: "Founders, leadership and engineering team at Override-R.", path: "/our-story/team" });

const groups = [
  { id: "founders", title: "Founders", intro: "Setting the direction and engineering standards of Override-R.", large: true },
  { id: "leadership", title: "Leadership team", intro: "Leading engineering, projects and business development.", large: false },
  { id: "engineering", title: "Engineering team", intro: "Control systems, design, commissioning and software engineering.", large: false },
] as const;

export default async function TeamPage() {
  const team = await getTeam();
  return (
    <>
      <PageHero variant="split" visual="network" eyebrow="Our people" title="Engineers first." intro="A multidisciplinary team spanning control systems, fire safety engineering, commissioning and software." crumbs={[{ label: "Home", href: "/" }, { label: "Our Story", href: "/our-story" }, { label: "Team" }]} />
      <StoryNav active="/our-story/team" />
      <Section tone="paper">
        <Container>
          <SampleNotice className="mb-16">Team profiles are placeholders. Names, photos, roles and biographies will be added with verified information only — no credentials are shown until confirmed.</SampleNotice>
          <div className="space-y-24">
            {groups.map((g) => {
              const members = team.filter((t) => t.group === g.id);
              return (
                <section key={g.id} aria-labelledby={g.id} className="grid gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-3">
                    <Eyebrow>{g.title}</Eyebrow>
                    <h2 id={g.id} className="mt-4 text-2xl font-semibold tracking-tight">{g.title}</h2>
                    <p className="mt-3 text-ink/60">{g.intro}</p>
                  </div>
                  <div className={g.large ? "grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:col-start-5" : "grid grid-cols-2 gap-6 md:grid-cols-3 lg:col-span-9 lg:grid-cols-4"}>
                    {members.map((m) => <TeamCard key={m.id} member={m} large={g.large} />)}
                  </div>
                </section>
              );
            })}
          </div>
          <div className="mt-24 flex flex-col items-start justify-between gap-6 rounded-2xl bg-ink p-10 text-white md:flex-row md:items-center">
            <p className="font-display text-2xl font-semibold">Want to join the team?</p>
            <ButtonLink href="/careers" arrow>View careers</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
