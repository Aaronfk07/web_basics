export default function Card() {
  return (
    <div className="w-80 bg-white shadow-lg rounded-lg overflow-hidden">
      <img 
        src="https://cdn.vectorstock.com/i/500p/93/28/black-human-silhouette-vector-55699328.jpg" 
        alt="Profile" 
        className="w-full h-72 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">John Doe</h2>
        <p className="text-gray-600">Architect & Engineer</p>
      </div>
    </div>
  );
}
