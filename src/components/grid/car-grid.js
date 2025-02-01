import CarItem from "./car-item";
import classes from './cars-grid.module.css';


export default function CarsGrid({cars}) {
    return (
        <ul className={classes.meals}>
            {cars.map(car => (
                <li key={car.id}>
                    <CarItem {...car} />
                </li>
            ))}
        </ul>
    )
}