import NavBar from "./NavBar"
import {BrowserRouter, Routes, Route} from 'react-router-dom'


const Home = () => {
    return(
        <section className="section--lg">



            <div className="section--md">
            <div className="index profile-index"></div>

            <div className="index my-stocks-index"></div>

            <div className="index profile-index"></div>
            </div>

        </section>
    )
}

export default Home