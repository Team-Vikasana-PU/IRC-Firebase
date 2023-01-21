
import Navbar from './Navbar'


const Map = () => {
    return (
        <>
            <Navbar />
            <div className='w-full flex flex-col items-center pt-32 px-10'>
                <h2 className='font-circular text-3xl md:text-6xl text-gradientPink mb-10'>University Map</h2>
                <iframe src="https://www.google.com/maps/d/u/0/edit?mid=1GSYIRYlUDzH-L5fcGAArX4vPWffmFO4&usp=sharing" className='w-full md:w-8/12' height="600"></iframe>
            </div>
        
        </>
    )
}

export default Map;