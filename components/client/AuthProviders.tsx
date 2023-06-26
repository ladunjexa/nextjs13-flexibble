"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

import Button from "@/components/server/Button";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (providers) {
    console.log(providers);
    return (
      <div>
        {Object.values(providers).map(
          (provider: Provider, i) =>
            provider.id === "google" && (
              <Button
                key={i}
                title="Continue with Google"
                leftIcon={"/google-light.svg"}
                // leftIcon={"/google-coloured.svg"} // Google Coloured Icon
                classes="bg-[#9747FF] hover:bg-[#9747FF]/90 focus:ring-4 focus:outline-none focus:ring-[#9747FF]/50 dark:focus:ring-[#9747FF]/55"
                handleClick={() => signIn(provider?.id)}
              />
            )
        )}
      </div>
    );
  }
};

export default AuthProviders;
