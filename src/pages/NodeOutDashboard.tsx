// src/pages/NodeOutDashboard.tsx
export default function NodeOutDashboard() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">🚀 NODE OUT</h1>
      <p className="text-lg mb-2">Automation that works while you sleep.</p>
      <p className="mb-6">You’ve officially deployed the NODE OUT engine. Choose your next module:</p>
      <div className="flex gap-4">
        <a href="/radio" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">Launch Voice Logs</a>
        <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">Admin Panel</button>
      </div>
    </div>
  );
}
