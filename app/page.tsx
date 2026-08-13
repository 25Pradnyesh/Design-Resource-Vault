import { ArchiveHero } from "@/components/archive/archive-hero";
import { CategoryTileGrid } from "@/components/archive/category-tile-grid";
import { ArchiveFeatured } from "@/components/archive/archive-featured";
import { ArchiveManifesto } from "@/components/archive/archive-manifesto";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <ArchiveHero />
      <CategoryTileGrid />
      <ArchiveFeatured />
      <ArchiveManifesto />
      <Footer />
    </div>
  );
}
