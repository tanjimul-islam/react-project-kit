import { useQuery } from "@tanstack/react-query";
import { Rocket, Shield, Zap } from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

export function Home() {
  const { data: features } = useQuery<Feature[]>({
    queryKey: ["features"],
    queryFn: () =>
      Promise.resolve([
        {
          icon: Rocket,
          title: "Fast Development",
          description:
            "Built with Vite for lightning-fast development and hot module replacement.",
        },
        {
          icon: Zap,
          title: "Modern Stack",
          description:
            "React 19, TypeScript, Tailwind CSS, and the latest tools and libraries.",
        },
        {
          icon: Shield,
          title: "Production Ready",
          description:
            "Optimized for production with best practices and modern tooling.",
        },
      ]),
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to React Starter Pack
        </h1>
        <p className="text-xl text-gray-600">
          A modern React application template with everything you need to build
          amazing apps.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features?.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
        <p className="text-gray-600 mb-6">
          Start building your application by editing the files in the src
          directory.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-left max-w-2xl mx-auto">
          <p className="text-sm text-gray-700 font-mono">
            # Available Scripts
            <br />
            npm run dev # Start development server
            <br />
            npm run build # Build for production
            <br />
            npm run preview # Preview production build
          </p>
        </div>
      </div>
    </div>
  );
}
