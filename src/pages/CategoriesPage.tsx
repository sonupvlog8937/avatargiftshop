import CategorySection from '../components/CategorySection';
import SectionHeading from '../components/SectionHeading';

export default function CategoriesPage() {
  return (
    <div className="pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Browse" title="All Categories" subtitle="Pick an occasion or gift type to start exploring." />
      </div>
      <div className="-mt-8">
        <CategorySection showHeading={false} />
      </div>
    </div>
  );
}
