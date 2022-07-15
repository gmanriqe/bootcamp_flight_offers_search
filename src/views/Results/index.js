// 1ero: Paquetes de terceros
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs'; // dayjs
import { es } from "dayjs/locale/es";


// 2do: Paquetes de mi propio proyecto
import { Banner } from "../../components/Banner";

// RTK
import { useSelector } from "react-redux";

dayjs.locale('es');
const Results = () => {
    const navigate = useNavigate()
    
    const stateFlight = useSelector(state => state.results.data);
    const isLoading = useSelector(state => state.results.isLoading);

    console.log(isLoading)
    if (stateFlight.length === 0) {
        setTimeout(() => {
            navigate('/')
        }, 6000)
    }

    const handleFlightDetail = (id) => {
        navigate(`/results/${id}`)
    }

    return (
        <>
            <Banner title='VUELOS DISPONIBLES' />
            <section className='main main-results'>
                <div className='container mx-auto'>
                    <div className='container-small pt-lg'>
                        <p>Total resultados ({stateFlight.length})</p>
                        <ul className='list-flight grid grid-cols-1'>
                            {
                                stateFlight.length > 0
                                    ? stateFlight.map((item, idx) => (
                                        <li key={idx} className='card-flight'>
                                            <div className="flex justify-between items-center">
                                                <div className='card-flight__left flex'>
                                                    <div className='card-flight__image'>
                                                        <span className='material-icons'>local_airport</span>
                                                    </div>
                                                    <div className='card-flight__hours'>
                                                        <p>{item.itineraries[0].duration.split('PT')[1].replace(/H/g, ' hrs ').replace(/M/g, ' mins ')}</p>
                                                        <div>{item.numberOfBookableSeats} Disponibles</div>
                                                        <div>{dayjs(new Date(item.lastTicketingDate)).format('DD MMMM YYYY')} Último día de reserva</div>
                                                    </div>
                                                </div>
                                                <div className='card-flight__luggage'> {item.oneWay === true ? '' : <span className="material-icons">no_luggage</span>} <span>{item.price.grandTotal} {item.price.currency}</span></div>
                                                <button className='card-flight__dropdown' title="VER DETALLE" data-id={item.id} onClick={() => handleFlightDetail(item.id)}>
                                                    <span className="material-icons">keyboard_arrow_down</span>
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                    : <p>No hemos encontrados vuelos disponibles. Por favor, realice nueva busqueda.</p>
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Results;