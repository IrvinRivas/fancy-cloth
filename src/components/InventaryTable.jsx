import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as garmentsActions from '../actions/garmentsActions';
import edit from '../images/edit.png';

function InventaryTable(props) {

    const searchProduct = (id) => {
        let product = props.garments.filter(product => product.id === id);
        return product[0]
    }

    return (
        <table>
            <tr className="inventory-row">
                <th className="inventory-row__item">Producto</th>
                <th className="inventory-row__item">Talla</th>
                <th className="inventory-row__item">Cantidad</th>
            </tr>
            {props.data.map((stock, i) => (
                <>
                {i % 2 === 0 ? 
                <tr key={'row'+i} className="inventory-row row-odd">
                    <td className="inventory-row__item row-odd__item">{searchProduct(stock.product).title}</td>
                    <td className="inventory-row__item row-odd__item">{stock.size}</td>
                    <td className="inventory-row__item row-odd__item inventory-row__container">
                        {stock.amount}
                        <Link to={`/admin/inventory/update/${stock.product}/${stock.size}/${stock.amount}`}>
                            <img className="inventory-row__img" src={edit} alt="editar"/>
                        </Link>
                        
                    </td>
                </tr>
                :
                <tr key={i} className="inventory-row">
                    <td className="inventory-row__item">{searchProduct(stock.product).title}</td>
                    <td className="inventory-row__item">{stock.size}</td>
                    <td className="inventory-row__item inventory-row__container">
                        {stock.amount}
                        <Link to={`/admin/inventory/update/${stock.product}/${stock.size}/${stock.amount}`}>
                            <img className="inventory-row__img" src={edit} alt="editar"/>
                        </Link>
                        
                    </td>
                </tr>
                }
                </>
            ))}
        </table>
    )
}

const mapStateToProps = ({ garmentReducers }) => {
    return garmentReducers
}

const mapDispatchToProps = {
    ...garmentsActions
}

export default connect(mapStateToProps, mapDispatchToProps)(InventaryTable)
