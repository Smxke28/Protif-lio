export default function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}
