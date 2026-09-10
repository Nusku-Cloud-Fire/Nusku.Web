import Link from "next/link";
import { Container, Display2 } from "@/components/ui";
import { getContent } from "@/lib/content";
import { path, type Lang } from "@/lib/i18n";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 text-2xl font-semibold text-white">{children}</h2>
  );
}

function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-body marker:text-blue">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function PrivacyPage({ lang }: { lang: Lang }) {
  const c = getContent(lang).privacy;
  const contactPath = path("contact", lang);

  return (
    <section className="overflow-hidden pt-40 pb-20 md:pt-[203px] md:pb-[110px]">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Display2 as="h1">{c.title}</Display2>

          {/*
            Only the translated versions carry this: the Spanish text is the
            operative one, so a translation has to say so rather than read as a
            second, equally binding policy.
          */}
          {c.precedenceNotice ? (
            <p className="ring-hairline mt-8 rounded-xl bg-surface p-5 text-sm text-g3">
              {c.precedenceNotice}
            </p>
          ) : null}

          <Heading>{c.introHeading}</Heading>
          <p className="mt-4 text-body">{c.introBody}</p>

          <Heading>{c.collectHeading}</Heading>

          <h3 className="mt-8 text-lg font-medium text-white">
            {c.permissionsHeading}
          </h3>
          <dl className="mt-4 space-y-4">
            {c.permissions.map((permission) => (
              <div key={permission.term}>
                <dt className="font-medium text-white">{permission.term}</dt>
                <dd className="text-body">{permission.body}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-8 text-lg font-medium text-white">
            {c.collectedHeading}
          </h3>
          <List items={c.collected} />

          <Heading>{c.usesHeading}</Heading>
          <List items={c.uses} />

          <Heading>{c.sharingHeading}</Heading>
          <p className="mt-4 text-body">{c.sharingBody}</p>
          <List items={c.sharing} />

          <Heading>{c.securityHeading}</Heading>
          <p className="mt-4 text-body">{c.securityBody}</p>

          <Heading>{c.rightsHeading}</Heading>
          <p className="mt-4 text-body">{c.rightsBody}</p>
          <List items={c.rights} />
          <p className="mt-4 text-body">{c.rightsFooter}</p>

          <Heading>{c.childrenHeading}</Heading>
          <p className="mt-4 text-body">{c.childrenBody}</p>

          <Heading>{c.updatesHeading}</Heading>
          <p className="mt-4 text-body">{c.updatesBody}</p>

          <Heading>{c.contactHeading}</Heading>
          <p className="mt-4 text-body">{c.contactBody}</p>
          <ul className="mt-4 space-y-2 text-body">
            <li>
              {c.contactEmailLabel}{" "}
              <a
                href="mailto:privacy@nusku.cloud"
                className="text-blue-plus underline"
              >
                privacy@nusku.cloud
              </a>
            </li>
            <li>
              {c.contactSiteLabel}{" "}
              <Link href={contactPath} className="text-blue-plus underline">
                {`https://nusku.cloud${contactPath}`}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
