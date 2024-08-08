import { useRef, useState, useEffect } from 'react';
import styles from './home.module.css';
import ChipDelete from '@mui/joy/ChipDelete';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Chip from '@mui/joy/Chip';

function Home() {
  const modelRef = useRef("");
  const colorRef = useRef("");
  const weightRef = useRef(null);
  const urlRef = useRef("")
  const [data, setData] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('cars')) || [];
    setData(storedData);
  }, []);

  function validate() {
    const errors = {};
    if (!modelRef.current.value) errors.model = "Model kiritilmadi";
    if (!colorRef.current.value) errors.color = "Rang kiritilmadi";
    if (!weightRef.current.value || weightRef.current.value <= 0) errors.weight = "Kiritilgan masa 0dan katta bolsin!!!";
    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newCar = {
      id: Date.now(),
      model: modelRef.current.value,
      color: colorRef.current.value,
      weight: weightRef.current.value,
      imgUrl: urlRef.current.value
    };

    const updatedData = [...data, newCar];
    setData(updatedData);
    localStorage.setItem('cars', JSON.stringify(updatedData));

    modelRef.current.value = "";
    colorRef.current.value = "";
    weightRef.current.value = "";
    urlRef.current.value="";
    setErrors({});
  }

  function handleDelete(id) {
    const updatedData = data.filter(car => car.id !== id);
    setData(updatedData);
    localStorage.setItem('cars', JSON.stringify(updatedData));
  }

  return (
    <div className={styles.container} >
      <form className={styles.form} onSubmit={handleSubmit}>
      <h2>TODO CAR APP   <br />   <span className={styles.sp}><a href="https://github.com/Jony2110/">by JONNY</a></span></h2>
        <input ref={modelRef} type="text" placeholder="Enter car model..." />
        {errors.model && alert("Avtomobil modelini kiriting!!!")}
        <input className={styles.inp} ref={colorRef} type="color" placeholder="Enter car color..." />
        <input ref={urlRef} type="text" placeholder="Enter img url..." />
       
        <input ref={weightRef} type="number" placeholder="Enter car weight..." />
        {errors.weight && alert("Avtomobil massasini kiriting!!!")}
        <button className={styles.btn} type="submit">PUSH</button>
      </form>
      <hr />
      <ul className={styles.ul}>
        {data.map(car => (
          <li  key={car.id} className={styles.card} >
            <img className={styles.img21} src={car.imgUrl} alt="Not Photo" />
            <p>Model: {car.model}</p>
            <p>Color: <span className={styles.span} style={{backgroundColor: `${car.color}`}}></span></p>
            <p>Weight: {car.weight} kg</p>
            <Chip
              variant="outlined"
              color="danger"
              onClick={() => handleDelete(car.id)}
              endDecorator={
                <ChipDelete
                  color="danger"
                  variant="plain"
                  onClick={() => handleDelete(car.id)}
                >
                  <DeleteForever />
                </ChipDelete>
              }
            >
              DELETE
            </Chip>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
