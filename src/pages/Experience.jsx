// ExperienceCard.jsx
export default function ExperienceCard({ title, description }) {
    return (
      <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{description}</p>
      </div>
    );
  }
  