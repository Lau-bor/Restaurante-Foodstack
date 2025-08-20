import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verificando...');
  const token = searchParams.get('token');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {

    let isMounted = true;

    const verify = async () => {
      if (!token) {
        setStatus('✖️ Token no encontrado')
        setError(true);
        return;
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/verify-email?token=${token}`);

        if (isMounted && res.data.success) {
          setStatus('✔️ Email verificado con exito, redirigiendo al login...');
          setVerified(true);
        }
      } catch (error) {
        if (isMounted) {
          setStatus('❌  Token invalido o expirado');
          setError(true);
        }
      }
    }

    verify();

    return () => {
      isMounted = false;
    }
  }, [token]);

  return (
<div className="d-flex justify-content-center align-items-center vh-100">
  <div className="bg-white p-5 rounded shadow text-center">
    <h2 className="fs-4 fw-semibold mb-3">Verificación de Email</h2>
    <p>{status}</p>
    {verified && (
      <button
        onClick={() => navigate("/login")}
        className="mt-4 btn btn-danger"
      >
        Ir a Login
      </button>
    )}
    {error && (
      <button
        onClick={() => navigate("/")}
        className="mt-4 btn btn-danger"
      >
        Volver al inicio
      </button>
    )}
  </div>
</div>
  )
}

export default VerifyEmail