// 1ero: Paquetes de terceros
import { useNavigate, Link } from "react-router-dom";
// DAYJS
import dayjs from 'dayjs';
import es from 'dayjs/locale/es'

// 2do: Paquetes de mi propio proyecto
import Header from "../../components/Header";
import { Banner } from "../../components/Banner";
import stateError from '../../assets/images/results_0.svg'

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
        }, 25000)
    }

    const handleFlightDetail = (id) => {
        navigate(`/results/${id}`)
    }

    return (
        <main className='main main-resutls'>
            <Header />
            <Banner title='VUELOS DISPONIBLES' />
            <div className='sm:container px-4'>
                <div className='container-small pt-6 sm:pt-16 pb-10'>
                    <div className='header-navigation'>
                        <p>Total resultados: {stateFlight.length}</p>
                        <Link to='/'><span className="material-icons icon-return">west</span></Link>
                    </div>
                    <ul className={stateFlight.length === 0 ? 'list-flight list-flight--widthout-shadow grid grid-cols-1' : 'list-flight grid grid-cols-1'} >
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
                                                    <p><strong>{item.numberOfBookableSeats} {Number(item.numberOfBookableSeats) === 1 ? 'UND' : 'UND'} DISP. </strong></p>
                                                    <small><strong>Duración: </strong>{item.itineraries[0].duration.split('PT')[1].replace(/H/g, ' hrs ').replace(/M/g, ' mins ')}</small>
                                                    <small><strong>Fec. final de reserva: </strong>{dayjs(new Date(item.lastTicketingDate)).format('DD MMMM YYYY')}</small>
                                                </div>
                                            </div>
                                            <div className='card-flight__luggage'> {item.oneWay === true ? '' : <span className="material-icons">no_luggage</span>} <span>{item.price.grandTotal} {item.price.currency}</span></div>
                                            <button className='card-flight__dropdown' title="VER DETALLE" data-id={item.id} onClick={() => handleFlightDetail(item.id)}>
                                                <span className="material-icons">chevron_right</span>
                                            </button>
                                        </div>
                                    </li>
                                ))
                                : <div>
                                    <p>¡Vaya! No hay ningún resultado.<Link to='/' className='link-return-page'> Nueva búsqueda</Link></p>
                                    <figure className='widthout-result-img'>
                                        <img src={stateError} alt="No results" />
                                    </figure>
                                </div>
                        }
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default Results;