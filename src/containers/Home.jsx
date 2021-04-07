import React, { useMemo } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux'
import * as garmentsActions from '../actions/garmentsActions';
import * as userActions from '../actions/userActions';

import Carrousel from '../components/Carrousel';
import Card from '../components/Card';
import Spinner from '../components/Spinner';


const Home = (props) => {
    const womenFilter = useMemo(() => 
    props.garmentReducers.garments.filter((garment) => {
        return garment.genre === 1
    }),[props.garmentReducers.garments, props.getAllGarments])

    const menFilter = useMemo(() => 
    props.garmentReducers.garments.filter((garment) => {
        return garment.genre === 0
    }),[props.garmentReducers.garments, props.getAllGarments])
   
return(
    <>
    <Helmet>
        <title>Home</title>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Fancy Cloth"/>
        <meta name="twitter:description" content="Fancy Cloth"/>
        <meta property="og:title" content="Fancy Cloth"/>
        <meta property="og:description" content="la mejor tienda online de ropa"/>
        <meta property="og:url" content="" />
        <meta property="og:site_name" content="Fancy Cloth" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content="ID_APP_FACEBOOK" />
    </Helmet>
    <div id="home">
        <div className="home-hero">
            <h1>Porque la clase se lleva puesta</h1>

            {props.garmentReducers.loading ?
                <Spinner/>
                :
                <>
                <Carrousel title="Dama">
                {womenFilter.length > 0 ?
                    womenFilter.map(garment => (
                        <Card
                            key={garment.id} 
                            id={garment.id} 
                            title={garment.title} 
                            description={garment.description} 
                            image={garment.image} 
                            price={garment.price} 
                            category={garment.category}
                            genre={garment.genre}
                        />
                    ))
                    :
                    <Spinner/> 
                }
            </Carrousel>
            <Carrousel title="Caballero">
                {menFilter.length > 0 ?
                    menFilter.map(garment => (
                        <Card
                            key={garment.id} 
                            id={garment.id} 
                            title={garment.title} 
                            description={garment.description} 
                            image={garment.image} 
                            price={garment.price} 
                            category={garment.category}
                            genre={garment.genre}
                        />
                    ))
                    :
                    <Spinner/>
                }
            </Carrousel>
            </>
            }
        </div>
    </div>
    </>
    
)
    
}

const mapStateToProps = ({ garmentReducers, userReducers }) => {
    return {
        garmentReducers,
        userReducers
    }
}

const mapDispatchToProps = {
    ...garmentsActions,
    ...userActions
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);