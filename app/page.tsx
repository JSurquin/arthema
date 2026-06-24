import { getCategoriesWithThumbnails } from "@/lib/enrich-resources";
import { HomeResources } from "@/components/home-resources";
import { HomeHero } from "@/components/home-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default async function Home() {
  const categories = await getCategoriesWithThumbnails();

  return (
    <div className="min-h-screen flex flex-col min-w-0 overflow-x-hidden">
      <SiteHeader />

      <main className="flex-1 mx-auto max-w-7xl w-full px-3 sm:px-5 lg:px-6 py-9 sm:py-12">
        <HomeHero />
        <HomeResources categories={categories} />
      </main>

      <SiteFooter />
    </div>
  );
}
