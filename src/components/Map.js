
import Navbar from './Navbar'


const Map = () => {
    return (
        <>
            <Navbar />
            <div className='w-full flex flex-col items-center pt-32'>
                <h2 className='font-circular text-6xl text-gradientPink mb-10'>University Map</h2>
            <iframe src="https://www.google.com/maps/d/u/0/embed?mid=10sQu62x6fEeZLRHnhSWn-of1PQ5JI0c&ehbc=2E312F" width="60%" height="600"></iframe>
            </div>
        
        </>
    )
}

export default Map;