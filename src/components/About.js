
import Navbar from './Navbar'


const About = () => {
    return (
        <>
            <Navbar />
            <div className='w-full flex flex-col items-center pt-32 px-10'>
                <h2 className='font-circular text-3xl md:text-6xl text-gradientPink mb-10'>About</h2>
                <p className='w-2/3 text-lg text-white/90'>IRC is recognised as one of the top contests for space robots. In IRC 2023, there will be a stronger focus on spreading knowledge about the best practises and procedures for systems engineering. The major objective is to emphasise the advantages of a strategy that addresses the entire project life cycle of constructing a Mars Rover.</p>
            </div>
        
        </>
    )
}

export default About;