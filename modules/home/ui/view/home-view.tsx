import { CTA } from "../components/cta";
import { Features } from "../components/features";
import { HowItWorks } from "../components/how-it-works";
import { SpinningSphereBackground } from "../components/shader";
import { SocialProof } from "../components/social-proof";

export const HomeView = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02080a] text-white">
      <div className="relative h-dvh w-full overflow-hidden">
        <SpinningSphereBackground />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.08),transparent_32%),linear-gradient(180deg,rgba(2,8,10,0),#02080a_14%)]" />
        <div className="relative">
          <HowItWorks />
          <Features />
          <SocialProof />
          <CTA />
        </div>
      </div>
    </main>
  );
};
