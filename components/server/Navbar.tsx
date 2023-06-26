import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "@/constants";
import { getCurrentUser } from "@/lib/session";
import { AuthProviders, ProfileMenu } from "@/components/client";
import Button from "./Button";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="Flexibble" />
        </Link>
        <ul className="xl:flex hidden text-smnall gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href="/create-project">
              <Button
                rightIcon="/rocket-icon-purple.svg"
                bgColor="bg-light-white-400 !w-max"
                textColor="text-black-100"
                title="Share Work"
              />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
