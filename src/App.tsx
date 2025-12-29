// import { useState, useEffect } from "react";

// const App = () => {
//   const [inputMenit, setInputMenit] = useState(0);
//   const [menit, setMenit] = useState(0);
//   const [detik, setDetik] = useState(0);
//   const [isActive, setIsActive] = useState(false);

//   const startCount = () => {
//     if (isActive) return;

//     if (menit === 0 && detik === 0) {
//       setMenit(inputMenit);
//     }
//     setIsActive(true);
//   };

//   useEffect(() => {
//     let interval: null | number = null;
//     if (isActive) {
//       interval = setInterval(() => {
//         if (detik > 0) {
//           setDetik(detik - 1);
//         } else {
//           if (menit > 0) {
//             setMenit(menit - 1);
//             setDetik(59);
//           } else {
//             setIsActive(false);
//             clearInterval(interval);
//             alert("Waktu habis");
//           }
//         }
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [detik, isActive, menit]);

//   const reset = () => {
//     setIsActive(false);
//     setMenit(0);
//     setDetik(0);
//   };

//   return (
//     <div>
//       <h1>Timer Versi useState</h1>
//       <div>
//         <input
//           type="number"
//           value={inputMenit}
//           onChange={(e) => setInputMenit(Number(e.target.value))}
//           disabled={isActive}
//         />{" "}
//         Menit
//       </div>

//       <h2>
//         {String(menit).padStart(2, "0")}:{String(detik).padStart(2, "0")}
//       </h2>
//       <button onClick={startCount}>Start</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   );
// };

// export default App;

import { useState, useEffect, useRef, useMemo } from "react";

const App = () => {
  const [inputMenit, setInputMenit] = useState(0);
  const [menit, setMenit] = useState(0);
  const [detik, setDetik] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const timerId = useRef(null);

  const tampilanWaktu = useMemo(() => {
    return `${String(menit).padStart(2, "0")}:${String(detik).padStart(
      2,
      "0"
    )}`;
  }, [menit, detik]);

  const startCount = () => {
    if (isActive) return;

    if (menit === 0 && detik === 0) {
      if (inputMenit > 0) {
        setMenit(inputMenit - 1);
        setDetik(59);
      } else {
        return alert("Masukkan durasi menit....");
      }
    }
    setIsActive(true);
    timerId.current = setInterval(() => {
      setDetik((detik) => {
        if (detik > 0) return detik - 1;

        setMenit((menit) => {
          if (menit > 0) {
            setDetik(59);
            return menit - 1;
          }
          stopTimer();
          alert("Waktu habis...");
          return 0;
        });
        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
    setIsActive(false);
  };

  const reset = () => {
    setIsActive(false);
    setMenit(0);
    setDetik(0);
  };

  useEffect(() => {
    return () => stopTimer();
  }, []);

  return (
    <div>
      <h1>Timer Versi Optimisasi</h1>
      <div>
        <input
          type="number"
          value={inputMenit}
          onChange={(e) => setInputMenit(Number(e.target.value))}
          disabled={isActive}
        />{" "}
        Menit
      </div>

      <h2>{tampilanWaktu}</h2>
      <div>
        {!isActive ? (
          <button onClick={startCount}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
