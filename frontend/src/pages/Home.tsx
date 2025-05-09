import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.jpg';
import { useUser } from '../context/UserContext';
import { fetchCities } from '../services/city.service';
import { startParking, stopParking, getUserParkings } from '../services/parking.service';
import type { City } from '../types/city.interface';

function Home() {
  const navigate = useNavigate();
  const { user } = useUser();

 

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedAreaId, setSelectedAreaId] = useState('');
  const [activeParkingId, setActiveParkingId] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const data = await fetchCities();
        setCities(data);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };

    const loadUserParking = async () => {
      if (!user) return;
      try {
        const userParkings = await getUserParkings(user.email);
        interface Parking {
          id: string;
          endTime: string | null;
        }

        const active = userParkings.find((p: Parking) => !p.endTime);
        if (active) {
          setActiveParkingId(active.id);
        }
      } catch (error) {
        console.error('Failed to fetch user parking:', error);
      }
    };

    loadCities();
    loadUserParking();
  }, [user]);

  const handlePay = async () => {
    if (!user || !selectedAreaId) {
      alert('You must be logged in and select a city and area.');
      return;
    }

    try {
      const res = await startParking({ userId: user.id, areaId: selectedAreaId });
      setActiveParkingId(res.id);
      alert('Parking started!');
    } catch (error) {
      console.error('Failed to start parking:', error);
      alert('Failed to start parking.');
    }
  };

  const handleStop = async () => {
    if (!activeParkingId) return;

    try {
      const res = await stopParking(activeParkingId);
      setActiveParkingId(null);
      setPrice(res.totalPrice); 
    } catch (error) {
      console.error('Failed to stop parking:', error);
      alert('Failed to stop parking.');
    }
  };

  const closeModal = () => setPrice(null);

  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 12, 52, 0.8), rgba(0, 12, 52, 0.8)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <nav className="navbar d-flex justify-content-end p-4">
        {user ? (
          <span className="text-white fw-bold me-3">Welcome, {user.fullName}</span>
        ) : (
          <>
            <button className="btn btn-outline-light me-3" onClick={() => navigate('/login')}>
              LOGIN
            </button>
            <button className="btn btn-outline-light" onClick={() => navigate('/signup')}>
              SIGN UP
            </button>
          </>
        )}
      </nav>

      <div className="text-center mt-5 pt-5">
        <h1 className="fw-bold">PARK YOUR CAR</h1>
        <p className="mt-2">After choosing the city please choose the parking area and hit "pay with Wango" button.</p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <select
            className="form-select w-auto"
            onChange={(e) => setSelectedCityId(e.target.value)}
          >
            <option value="">Choose city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          <select
            className="form-select w-auto"
            onChange={(e) => setSelectedAreaId(e.target.value)}
            disabled={!selectedCityId}
          >
            <option value="">Choose parking area</option>
            {cities
              .find((c) => c.id === selectedCityId)
              ?.parkingAreas.map((area: { id: string; name: string }) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
          </select>

          <button className="btn btn-danger" onClick={handlePay} disabled={!!activeParkingId}>
            PAY WITH WANGO
          </button>

          {activeParkingId && (
            <button className="btn btn-warning" onClick={handleStop}>
              STOP PARKING
            </button>
          )}
        </div>
      </div>

      {price !== null && (
        <div
          style={{
            position: 'fixed',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -30%)',
            backgroundColor: 'white',
            color: 'black',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            zIndex: 1000,
          }}
        >
          <h4>Parking Stopped</h4>
          <p>Total Price: <strong>{price}$</strong></p>
          <button className="btn btn-dark mt-2" onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Home;
