import ContentHighlights from "@/components/ContentHighlights";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import QuickSearch from "@/components/QuickSearch";

const HomePage = () => (
  <>
    <Hero />
    <QuickSearch />
    <FeaturedProjects />
    <ContentHighlights />
  </>
);

export default HomePage;
