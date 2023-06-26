import Image from "next/image";
import Link from "next/link";

import { ProjectsSearch } from "@/common.types";
import { footerLinks } from "@/constants";
import { fetchAllProjects } from "@/lib/actions";

type ColumnProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = async () => {
  const data = (await fetchAllProjects()) as ProjectsSearch;
  const numberOfProjects = data?.projectSearch?.edges.length || null;

  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image
            src="/logo-purple.svg"
            width={115}
            height={38}
            alt="Flexibble"
          />
          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Flexibble is the world's leading community for creatives to share,
            grow and get hired.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          {footerLinks.map((link, index) => {
            if (index === 2 || index === 5) return null;
            else if (index === 1 || index === 4)
              return (
                <div className="flex-1 flex flex-col gap-4">
                  <FooterColumn title={link.title} links={link.links} />
                  <FooterColumn
                    title={footerLinks[index + 1].title}
                    links={footerLinks[index + 1].links}
                  />
                </div>
              );
            else return <FooterColumn title={link.title} links={link.links} />;
          })}
        </div>
      </div>

      <div className="flexBetween footer_copyright">
        <p>&copy; 2023 Flexibble. All rights reserved.</p>
        <p className="text-gray">
          <span className="text-black font-semibold">
            {numberOfProjects || "No"}
          </span>{" "}
          projects submitted
        </p>
      </div>
    </footer>
  );
};

export default Footer;
