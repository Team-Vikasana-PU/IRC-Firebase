
import Navbar from './Navbar'


const About = () => {
    return (
        <>
            <Navbar />
            <div className='w-full flex flex-col items-center pt-32 px-10'>
                <h2 className='font-circular text-3xl md:text-6xl text-gradientPink mb-10'>About</h2>

                <h3 className='text-gradientBlue text-2xl my-5 font-tele font-bold'>Presidency University</h3>
                <p className='w-2/3 text-lg text-white/90 mb-5'>Presidency University’s vision is to be a worldclass University. We believe in nurturing talent
amongst all those who enter our portals.
Through this close nurturing of talent and skills
in each individual, we aim to transform
students to become successful professionals
and responsible citizens. We accomplish all
these through excellence in teaching, best in
pedagogy borrowed from the world, an
efficient research and study cell, and service
and community development in focus. Our
commitment is towards shaping lives of
students through scholarly exposure,
pedagogy and learning and that which
contributes to making the youth future ready
for the world at large.
                </p>

                <h3 className='text-gradientBlue text-2xl my-5 font-tele font-bold'>IRC</h3>
                <p className='w-2/3 text-lg text-white/90 mb-5'>International Rover Challenge (formerly Indian Rover Challenge)
started in the year 2017 and the first edition took place in the January
of the following year. Over the years, IRC has established as one of the
leading space robotics competitions. In IRC 2023 there will be an
increased emphasis on creating awareness about the best practices
and methods of systems engineering. The main focus is to highlight
the benefits of an approach covering the whole project life cycle of
developing a Mars Rover. In order to achieve that, changes have been
made to the IRC Review Stages (Qualifiers) and the on-site Finals.
                </p>
                
                <h3 className='text-gradientBlue text-2xl my-5 font-tele font-bold'>Team Vikasana</h3>
                <p className='w-2/3 text-lg text-white/90 mb-5'>Team Vikasana is the student research and development team of Presidency
University, Bengaluru, working under the guidance of professors at the
Research and Innovation dept, Presidency University, Bengaluru. We are a team
of students that aim to conceptualize, build and deliver top-notch robots.
Vikasana builds Technologies and innovations to contribute to a better
learning experience in the university and represent and participate in technical
conventions, conferences and competitions hosted in the collegiate, state
levels in India and abroad.
We are always in pursuit to expand our apprenticeship in research, innovation,
robots, space and other areas of engineering and technology.
                </p>
                
                
            </div>
        
        </>
    )
}

export default About;