import { useEffect, useState } from "react";

export default function FetchApi() {
  const [users, setUsers] = useState([]);
  const [weather, setWeather] = useState(null);
  const [gempa, setGempa] = useState(null);

  useEffect(() => {
    async function getUsers() {
      const usersURL = "https://jsonplaceholder.typicode.com/users";
      const postsURL = "https://jsonplaceholder.typicode.com/posts";
      const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=1.4225&longitude=124.9772&current=temperature_2m,relative_humidity_2m&timezone=Asia%2FSingapore";
      const gempaURL = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";  


      const [usersRes, postsRes, weatherRes, gempaRes] = await Promise.all([
        fetch(usersURL),
        fetch(postsURL),
        fetch(weatherURL), 
        fetch(gempaURL),
      ]);

      const usersData = await usersRes.json();
      const postsData = await postsRes.json();
      const weatherData = await weatherRes.json(); 
      const gempaData = await gempaRes.json();

      setUsers(usersData);
      setWeather(weatherData); 
      setGempa(gempaData.Infogempa.gempa);
    }

    getUsers();
  }, []);

  // 3. Tampilkan data
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
        Daftar <span className="text-blue-600">Users</span>
      </h1>
      <p className="text-gray-600 text-sm mb-6 text-center">
        Data diambil dari jsonplaceholder.typicode.com/users
      </p>

      {weather && (
        <div className="flex justify-center mb-10">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-600 font-semibold mb-1">Cuaca Saat Ini</p>
            <p className="text-gray-800 font-medium text-lg">
              Suhu: {weather.current.temperature_2m}{weather.current_units.temperature_2m} | 
              Kelembapan: {weather.current.relative_humidity_2m}{weather.current_units.relative_humidity_2m}
            </p>
          </div>
        </div>
      )}

      {gempa && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-10">
    <h2 className="text-2xl font-bold text-red-700 mb-4">
      Informasi Gempa Bumi Terbaru
    </h2>

    <img
      src="https://cdn.bmkg.go.id/20261012235633.mmi.jpg"
      alt="Peta guncangan gempa bumi BMKG"
      className="w-full max-w-2xl mx-auto rounded-lg border border-gray-200 mb-5"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />

    <p>Tanggal: {gempa.Tanggal}</p>
    <p>Jam: {gempa.Jam}</p>
    <p>Magnitudo: {gempa.Magnitude}</p>
    <p>Kedalaman: {gempa.Kedalaman}</p>
    <p>Wilayah: {gempa.Wilayah}</p>
    
    {gempa.Dirasakan && (
      <p>Dirasakan: {gempa.Dirasakan}</p>
    )}
  </div>
)}


      <div className="grid gap-4 sm:grid-cols-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <h2 className="font-semibold text-gray-900">{user.id}</h2>
            <p className="text-sm text-gray-600">{user.name}</p>
            <p className="text-sm text-gray-600">{user.username}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.address.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
